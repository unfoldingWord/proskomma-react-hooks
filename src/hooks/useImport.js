import { useCallback, useState } from 'react';
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

  const onImport = useCallback((props) => {
    newStateId();

    if (_onImport) { _onImport(props); };
  }, [_onImport, newStateId]);

  const runImport = useDeepCompareCallback(() => {
    let _errors = [];

    if (proskomma) {
      try {
        importDocuments({
          proskomma, documents, onImport, verbose,
        });
      } catch (e) {
        _errors = [e];
      };
    } else {
      _errors = [`useImport({proskomma, documents, stateId, newStateId}): proskomma not provided`];
    };

    setErrors(_errors);
  }, [documents, verbose]);

  useDeepCompareEffect(() => {
    runImport();
  }, [documents]);

  return { errors };
};

useImport.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Function to trigger a new stateId onImport */
  newStateId: PropTypes.func.isRequired,
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
      /** USFM string for the book */
      data: PropTypes.string.isRequired,
    }),
  ),
  /** console success details */
  verbose: PropTypes.bool,
};
