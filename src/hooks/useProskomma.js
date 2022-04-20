import {
  useState, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';

import { Proskomma } from 'proskomma';

import { UWProskomma, randomString } from '..';

/**
 * This is the hook.
 */
function useProskomma({ verbose, unfoldingWord = true, }) {
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
      _proskomma = unfoldingWord ? new UWProskomma() : new Proskomma();
      newStateId();
      // import frozen proskomma state
    } catch (e) {
      setErrors([e]);
    };
    return _proskomma;
  }, [newStateId, unfoldingWord]);

  const state = {
    proskomma,
    stateId,
    errors,
  };

  const actions = {
  };

  return { state, actions };
};

useProskomma.propTypes = {
  /** console log details */
  verbose: PropTypes.bool,
  /** Is this an unfoldingWord related project? Set to false if it won't import */
  unfoldingWord: PropTypes.bool,
};

useProskomma.defaultProps = {
  unfoldingWord: true,
};

export default useProskomma;