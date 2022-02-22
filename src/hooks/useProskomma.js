import {
  useState, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';

import { UWProskomma, randomString } from '..';

/**
 * This is the hook.
 */
export default function useProskomma({ verbose }) {
  // manage two states required since they need updating at different times.
  const [stateId, setStateId] = useState(''); // needs to start out defined and type is string
  const [errors, setErrors] = useState([]);

  const newStateId = useCallback(() => {
    const _stateId = randomString();

    if (verbose) {
      console.log('useProskomma.newStateId(): ' + _stateId);
    };
    setStateId(_stateId);
  }, [verbose]);

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

  return {
    proskomma, stateId, newStateId, errors,
  };
};

useProskomma.propTypes = {
  /** console log details */
  verbose: PropTypes.bool,
};
