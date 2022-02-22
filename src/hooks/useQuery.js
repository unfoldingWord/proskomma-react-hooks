import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareCallback } from 'use-deep-compare';

export default function useQuery({
  proskomma, stateId, query, verbose,
}) {
  const cleanState = {
    stateId: '',
    query: '',
    data: {},
    errors: [],
  };
  const [state, setState] = useState({ ...cleanState });

  const runQuery = useDeepCompareCallback(async () => {
    if (verbose) {
      console.log('runQuery() stateId: ' + stateId);
    };

    let data;
    let errors = [];

    if (query.length > 0) {
      const { errors: _errors, data: _data } = await proskomma.gqlQuery(query);
      errors = _errors || [];

      if (_data) {
        data = JSON.parse(JSON.stringify(_data)); // graphQL nested object fix
      };
    } else {
      errors = ['useQuery.runQuery(): Empty query not run.'];
    }

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
  /** console log details */
  verbose: PropTypes.bool,
};

useQuery.defaultProps = {
  proskomma: undefined,
  stateId: '',
  query: '',
};