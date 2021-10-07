import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareCallback,  } from 'use-deep-compare';
import { parseDocSets } from '../helpers/parseDocSets';

export default function usePassageFilter({data, stateId}) {
  const cleanState = {
    passages: [],
    stateId: 0,
    errors: [],
  };
  const [state, setState] = useState({ ...cleanState });

  const parse = useDeepCompareCallback(() => {
    let passages;
    let errors = [];

    try {
      passages = parseDocSets({data});
    } catch (error) {
      errors = [error];
    };

    setState({
      stateId,
      passages,
      errors,
    });
  }, [data, stateId]);

  useEffect(() => {
    if (state.stateId !== stateId) {
      console.log('usePassageFilter.useEffect() stateId: ' + stateId);
      parse();
    };
  }, [stateId, state.stateId, parse]);

  return state;
};

usePassageFilter.propTypes = {
  /** Result from Proskomma GraphQL Query */
  data: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
};

usePassageFilter.defaultProps = {
  data: {},
  stateId: 0,
};