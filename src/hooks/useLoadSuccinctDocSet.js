import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareEffect, useDeepCompareCallback } from 'use-deep-compare';

export default function useLoadSuccinctDocSet({
  proskomma,
  stateId,
  newStateId,
  succinctDocSet,
  verbose,
}) {
  const [errors, setErrors] = useState([]);

  const runLoad = useDeepCompareCallback(async () => {
    let _errors = [];

    if (proskomma && succinctDocSet) {
      try {
        proskomma.loadSuccinctDocSet(succinctDocSet);
        newStateId();
      } catch (e) {
        _errors = e;
      };
    } else {
      _errors = [`useImport({proskomma, stateId: ${stateId}}): proskomma not provided`];
    };

    setErrors(_errors);
  }, [stateId, succinctDocSet, verbose]);

  useDeepCompareEffect(() => {
    runLoad();
  }, [succinctDocSet]);

  return { errors };
};

useLoadSuccinctDocSet.propTypes = {
  /** Array of documents to be imported */
  succinctDocSet: PropTypes.object,
  /** console success details */
  verbose: PropTypes.bool,
};
