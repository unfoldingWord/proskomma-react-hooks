import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareMemo } from 'use-deep-compare';

export default function useSuccinctDocSetSerialize({
  proskomma,
  docSetId,
  stateId,
  verbose,
}) {
  const initialState = {
    stateId,
    docSetId,
    errors: [],
  };
  const [state, setState] = useState(initialState);

  const succinctDocSet = useDeepCompareMemo(() => {
    let errors = [];
    let succinctDocSet;

    if (proskomma) {
      try {
        succinctDocSet = proskomma.serializeSuccinct(docSetId);

        if (verbose) {
          console.log(`useSuccinctDocSetSerialize({proskomma, stateId: ${stateId}}): success.`);
        };
      } catch (e) {
        errors = e;
      };
    } else {
      errors = [`useSuccinctDocSetSerialize({proskomma, stateId: ${stateId}}): proskomma not provided`];
    };

    setState({
      stateId,
      docSetId,
      errors,
    });
    return succinctDocSet;
  }, [stateId, docSetId]);

  return { ...state, succinctDocSet };
};

useSuccinctDocSetSerialize.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
  /** The docSetId to know which docSet to search, ie. "unfoldingword/en_ult" */
  docSetId: PropTypes.string.isRequired,
  /** console success details */
  verbose: PropTypes.bool,
};
