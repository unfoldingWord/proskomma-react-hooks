import { useState, useEffect } from 'react';
import { useDeepCompareCallback } from 'use-deep-compare';
import PropTypes from 'prop-types';

import {
  searchForBookCodesQuery,
  searchForBookCodesFilter,
} from '../helpers/searchForBookCodes';
import { useQuery } from '..';

export default function useSearchForBookCodes ({
  proskomma,
  stateId,
  docSetId,
  text,
}) {
  const cleanState = {
    query: '',
    bookCodes: [],
    stateId: 0,
    errors: [],
    data: {},
  };
  const [state, setState] = useState({ ...cleanState });

  const query = searchForBookCodesQuery({text, docSetId});

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
    let bookCodes = [];
    let errors = [...queryErrors];

    if (errors.length < 1) {
      try {
        bookCodes = searchForBookCodesFilter({data});
      } catch (error) {
        errors = [...errors, error];
      };
    } else {
      debugger
    };

    setState({
      stateId: queryStateId,
      query,
      data,
      bookCodes,
      errors,
    });
  }, [data, queryStateId]);

  useEffect(() => {
    if (state.stateId !== queryStateId) {
      console.log('useSearchForBookCodes.useEffect() stateId: ' + queryStateId);
      parse();
    };
  }, [state.stateId, queryStateId, parse]);

  return state;
};

useSearchForBookCodes.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
  /** The docSetId to know which document to search, ie. "unfoldingword/en_ult" */
  docSetId: PropTypes.string,
  /** Text to search for */
  text: PropTypes.string,
};

useSearchForBookCodes.defaultProps = {
  proskomma: undefined,
  stateId: 0,
  text: '',
};