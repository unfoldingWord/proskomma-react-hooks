import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareEffect, useDeepCompareCallback } from 'use-deep-compare';

export default function useSuccinctDocSetLoad({
  proskomma,
  stateId,
  newStateId,
  succinctDocSet,
  verbose,
}) {
  const [errors, setErrors] = useState([]);

  const runLoad = useDeepCompareCallback(() => {
    let _errors = [];

    if (succinctDocSet) {
      if (proskomma) {
        try {
          proskomma.loadSuccinctDocSet(succinctDocSet);
          newStateId();
        } catch (e) {
          _errors = e;
        };
      } else {
        _errors = [`useSuccinctDocSetLoad({proskomma, stateId: ${stateId}}): proskomma not provided`];
      };
    };

    setErrors(_errors);
  }, [stateId, succinctDocSet, verbose]);

  useDeepCompareEffect(() => {
    runLoad();
  }, [succinctDocSet]);

  return { errors };
};

useSuccinctDocSetLoad.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string.isRequired,
  /** Function to trigger a new stateId onImport */
  newStateId: PropTypes.func.isRequired,
  /** Array of documents to be imported */
  succinctDocSet: PropTypes.object,
  /** console success details */
  verbose: PropTypes.bool,
};
