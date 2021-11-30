import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { UWProskomma, randomString } from '..';

/**
 * This is the hook.
 */
export default function useProskomma ({
  documents,
  serialize,
  verbose,
}) {
  // manage two states required since they need updating at different times.
  const [stateId, setStateId] = useState(0);
  const [errors, setErrors] = useState([]);

  const newStateId = useCallback(() => {
    const _stateId = randomString();
    console.log('useProskomma.newStateId(): ' + _stateId);
    setStateId(_stateId);
  }, []);

  const proskomma = useMemo(() => {
    let _proskomma;
    try {
      _proskomma = new UWProskomma();
      newStateId();
      // import frozen proskomma state
    } catch (e) {
      setErrors([e]);
    };
    return _proskomma;
  }, [newStateId]);

  return { proskomma, stateId, newStateId, errors, };
};

useProskomma.propTypes = {
  /** console success details */
  verbose: PropTypes.bool,
};
