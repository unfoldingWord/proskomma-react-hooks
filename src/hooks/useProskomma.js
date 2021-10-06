import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import { useDeepCompareEffect, useDeepCompareCallback } from 'use-deep-compare';

import { UWProskomma, importDocuments, randomString } from '..';

/**
 * This is the hook.
 */
export default function useProskomma ({
  documents,
  serialize,
  verbose,
}) {
  // manage two states required since they need updating at different times.
  const [changeIndex, setChangeIndex] = useState(0);
  const cleanState = {
    proskomma: {},
    documents: [],
    errors: [],
  };
  const [state, setState] = useState(cleanState);

  const incrementChangeIndex = useCallback(() => {
    const _changeIndex = randomString();
    console.log('useProskomma.incrementChangeIndex(): ' + _changeIndex);
    setChangeIndex(_changeIndex);
  }, []);

  const runImport = useDeepCompareCallback( async () => {
    const proskomma = new UWProskomma();  
    const onImport = incrementChangeIndex;
    let errors = [];

    try {
      importDocuments({ proskomma, documents, onImport, serialize, verbose });
    } catch (_errors) {
      errors = _errors;
    };

    setState({
      proskomma,
      documents: deepFreeze(documents),
      errors,
    });
  }, [documents, serialize, verbose]);

  useDeepCompareEffect(() => {
    if (documents !== state.documents) {
      runImport();
    };
  }, [documents, state.documents]);

  return { changeIndex, ...state };
};

useProskomma.propTypes = {
  /** Array of documents to be imported */
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      /** { org, lang, abbr } */
      selectors: PropTypes.shape({
        /** Selector: Organization or Owner for context */
        org: PropTypes.string.isRequired,
        /** Selector: Language abbreviation */
        lang: PropTypes.string.isRequired,
        /** Selector: Abbreviation for Bible Translation (ULT) */
        abbr: PropTypes.string.isRequired,
      }),
      /**  */
      bookId: PropTypes.string,
      /** USFM string for the book */
      data: PropTypes.string.isRequired,
    })
  ),
  /** Serialize true/false */
  serialize: PropTypes.bool,
  /** console success details */
  verbose: PropTypes.bool,
};
