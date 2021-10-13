import { useState, useEffect } from 'react';
import { useDeepCompareCallback,  } from 'use-deep-compare';
import PropTypes from 'prop-types';

import { searchQuery, parseSearchResponse } from '../helpers/search';
import { useQuery } from '..';

export default function useSearch ({
  proskomma,
  stateId,
  text,
}) {
  const cleanState = {
    query: '',
    passages: [],
    stateId: 0,
    errors: [],
  };
  const [state, setState] = useState({ ...cleanState });

  const query = searchQuery({text});
  const {
    stateId: queryStateId,
    data, 
    errors: queryErrors, 
  } = useQuery({
    proskomma,
    stateId,
    query,
  });

  const parse = useDeepCompareCallback(() => {
    let passages;
    let errors = [...queryErrors];

    if (errors.length < 1) {
      try {
        passages = parseSearchResponse({data});
      } catch (error) {
        errors = [...errors, error];
      };
    } else {
      debugger
    }

    setState({
      stateId: queryStateId,
      query,
      data,
      passages,
      errors,
    });
  }, [data, queryStateId]);

  useEffect(() => {
    if (state.stateId !== queryStateId) {
      console.log('useSearch.useEffect() stateId: ' + queryStateId);
      parse();
    };
  }, [state.stateId, queryStateId, parse]);

  return state;
};

useSearch.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
  /** GraphQL Query to run */
  text: PropTypes.string,
};

useSearch.defaultProps = {
  proskomma: undefined,
  stateId: 0,
  text: '',
};