import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareCallback } from 'use-deep-compare';

export default function useQuery({proskomma, stateId, query}) {
  const cleanState = {
    query: '',
    data: {},
    stateId: 0,
    errors: [],
  };
  const [state, setState] = useState({ ...cleanState });

  const runQuery = useDeepCompareCallback(async () => {
    console.log('runQuery() stateId: ' + stateId);

    let data;
    let errors = [];

    try {
      const { errors: _errors, data: _data } = await proskomma.gqlQuery(query);
      errors = _errors || [];
      data = JSON.parse(JSON.stringify(_data)); // graphQL nested object fix
    } catch (error) {
      errors = [error];
    };

    setState({
      query,
      data,
      stateId,
      errors,
    });
  }, [proskomma, query, stateId]);

  useEffect(() => {
    if (state.stateId !== stateId || query !== state.query) {
      runQuery();
    };
  }, [query, stateId, state.stateId, state.query, runQuery]);

  return state;
};

useQuery.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
  /** GraphQL Query to run */
  query: PropTypes.string,
};

useQuery.defaultProps = {
  proskomma: undefined,
  stateId: 0,
  query: '',
};