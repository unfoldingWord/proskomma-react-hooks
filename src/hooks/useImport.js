import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareEffect, useDeepCompareCallback } from 'use-deep-compare';

import { importDocuments } from '..';

export default function useImport ({
  proskomma,
  stateId,
  newStateId,
  documents,
  verbose,
}) {
  const [errors, setErrors] = useState([]);   

  const runImport = useDeepCompareCallback( async () => {
    const onImport = newStateId;
    let _errors = [];

    if (proskomma) {
      try {
        importDocuments({ proskomma, documents, onImport, verbose });
      } catch (e) {
        _errors = e;
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
  /** console success details */
  verbose: PropTypes.bool,
};
