import { useState, useEffect } from 'react';
import { useDeepCompareCallback } from 'use-deep-compare';

export default function useQuery({proskomma, changeIndex, query}) {
  const cleanState = {
    query: '',
    data: {},
    changeIndex: 0,
    errors: [],
  };
  const [state, setState] = useState({ ...cleanState });

  const runQuery = useDeepCompareCallback(async () => {
    console.log('runQuery() changeIndex: ' + changeIndex);

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
      changeIndex,
      errors,
    });
  }, [proskomma, query, changeIndex]);

  useEffect(() => {
    if (state.changeIndex !== changeIndex || query !== state.query) {
      runQuery();
    };
  }, [query, changeIndex, state.changeIndex, state.query, runQuery]);

  return state;
};