import { useState, useEffect } from 'react';
import { useDeepCompareCallback,  } from 'use-deep-compare';
import { parseDocSets } from '../helpers/parseDocSets';

export default function usePassageFilter({data, changeIndex}) {
  const cleanState = {
    passages: [],
    changeIndex: 0,
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
      changeIndex,
      passages,
      errors,
    });
  }, [data, changeIndex]);

  useEffect(() => {
    if (state.changeIndex !== changeIndex) {
      console.log('usePassageFilter.useEffect() changeIndex: ' + changeIndex);
      parse();
    };
  }, [changeIndex, state.changeIndex, parse]);

  return state;
};