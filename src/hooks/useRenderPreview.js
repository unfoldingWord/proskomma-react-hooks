import { useState } from 'react';
import { useDeepCompareCallback, useDeepCompareEffect } from 'use-deep-compare';
import PropTypes from 'prop-types';
import { renderUsfmToHTML } from '../helpers/renderPreview';

export default function useRenderPreview({
  proskomma,
  stateId,
  docSetId,
  language,
  dir,
  structure,
  i18n,
  ready,
  verbose,
}) {
  const initialState = {
    html: undefined,
    running: false,
    errors: [],
    stateId: undefined,
  };
  const [state, setState] = useState(initialState);
  const [progress, setProgress] = useState(0);

  // const reset = useCallback(() => setState(initialState), []);

  const run = useDeepCompareCallback(async () => {
    let html;
    let errors = [];

    try {
      const results = await renderUsfmToHTML({
        proskomma,
        stateId,
        docSetId,
        language,
        dir,
        structure,
        i18n,
        onProgress: setProgress,
      });

      html = results.output;

      if (verbose) { console.log('useRenderPreview.renderUsfmToHTML', results); };
    } catch (e) {
      errors = [e];

      if (verbose) { console.error('Proskomma Render Error', e); };
    };

    setState({ html, errors, stateId, running: false });
  }, [state.running, stateId, docSetId, i18n, structure, language, dir]); // don't use proskomma here, it's too big, stateId is what will change

  useDeepCompareEffect(() => {
    const hasDependencies = (!!proskomma && !!stateId && !!i18n, !!structure, !!language);

    const stateId_ = (stateId !== state.stateId);
    const propsChanged = (stateId_);

    const shouldRun = (ready && hasDependencies && propsChanged);

    if (verbose) { console.log('useRenderPreview.shouldRun', { hasDependencies, propsChanged, shouldRun }); }

    if (shouldRun) {
      setState(prev => ({ ...prev, running: true }));
      run();
    };
  }, [proskomma, stateId, i18n, structure, language, docSetId, ready]);

  return {
    ...state,
    progress,
  };
};

useRenderPreview.propTypes = {
  docSetId: PropTypes.object,
  dir: PropTypes.any,
  structure: PropTypes.object,
  i18n: PropTypes.object,
  ready: PropTypes.bool,
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** console log details */
  verbose: PropTypes.bool,
};
