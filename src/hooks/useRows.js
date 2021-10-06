import { useState } from 'react';
import { useDeepCompareEffect } from 'use-deep-compare';

import { parseDocSets } from '..'

export default function useRowFilter({data, changeIndex}) {
  const cleanState = {
    rows: [],
    changeIndex: 0,
  };
  const [state, setState] = useState({...cleanState});

  useDeepCompareEffect(() => {
    const rows = parseDocSets({data});
    setState({rows, changeIndex});
  }, [data, changeIndex]);

  return {
    state,
  };
};