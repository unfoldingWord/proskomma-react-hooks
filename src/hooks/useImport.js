import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareEffect, useDeepCompareCallback } from 'use-deep-compare';

import { importDocuments } from '..';

export default function useImport({
  proskomma,
  newStateId,
  onImport: _onImport,
  documents,
  verbose,
}) {
  const [errors, setErrors] = useState([]);
  const [importedCount, setImportedCount] = useState(0);

  const onImport = useCallback((props) => {
    newStateId();

    if (_onImport) { _onImport(props); };
    setImportedCount(prev => prev + 1);
  }, [_onImport, newStateId]);

  const runImport = useDeepCompareCallback(async () => {
    let _errors = [];

    if (proskomma) {
      const errors = await importDocuments({
        proskomma, documents, onImport, verbose,
      });
      _errors = errors.filter(e => !!e);
    } else {
      _errors.push(`useImport({proskomma, documents, stateId, newStateId}): proskomma not provided`);
    };

    setErrors(_errors);
  }, [documents, verbose]);

  useDeepCompareEffect(() => {
    runImport();
  }, [documents]);

  const documentsCount = documents.length;

  const importing = useMemo(() => (importedCount < documentsCount), [importedCount, documentsCount]);

  const done = useMemo(() => (!importing && importedCount > 0), [importing, importedCount]);

  return { errors, importing, done };
};

useImport.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Function to trigger a new stateId onImport */
  newStateId: PropTypes.func.isRequired,
  /** Callback when document is imported, props={org, lang, abbr, bookCode} */
  onImport: PropTypes.func,
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
      bookCode: PropTypes.string,
      /** data string for the book */
      data: PropTypes.string,
      /** URL to download the book */
      url: PropTypes.string,
      /** type of file, ie. usfm, usx */
      filetype: PropTypes.string,
    }),
  ),
  /** console success details */
  verbose: PropTypes.bool,
};
