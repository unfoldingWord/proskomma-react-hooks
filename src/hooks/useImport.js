import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareEffect, useDeepCompareCallback } from 'use-deep-compare';

import { importDocuments } from '..';

export default function useImport({
  proskomma,
  stateId,
  newStateId,
  onImport: _onImport,
  documents,
  verbose,
}) {
  const [errors, setErrors] = useState([]);

  const onImport = useCallback((props) => {
    newStateId();
    _onImport(props);
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
      _errors = [`useImport({proskomma, stateId: ${stateId}}): proskomma not provided`];
    };

    setErrors(_errors);
  }, [stateId, documents, verbose]);

  useDeepCompareEffect(() => {
    runImport();
  }, [documents]);

  return { errors };
};

useImport.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string.isRequired,
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
