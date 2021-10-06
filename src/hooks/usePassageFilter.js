import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

usePassageFilter.propTypes = {
  /** Result from Proskomma GraphQL Query */
  data: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  changeIndex: PropTypes.string,
};

usePassageFilter.defaultProps = {
  data: {},
  changeIndex: 0,
};