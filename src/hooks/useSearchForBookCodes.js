import { useState, useMemo } from 'react';
import { useDeepCompareCallback, useDeepCompareEffect } from 'use-deep-compare';
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
  verbose,
}) {
  const cleanState = {
    docSetId,
    query: '',
    text: '',
    bookCodes: [],
    stateId: '',
    errors: [],
    data: {},
  };
  const [state, setState] = useState({ ...cleanState });

  const query = useMemo(() => {
    let _query = state.query;
    if (text && docSetId) _query = searchForBookCodesQuery({text, docSetId});
    return _query;
  }, [text, docSetId, state.query]);

  const {
    stateId: queryStateId,
    data, 
    errors: queryErrors, 
  } = useQuery({
    proskomma,
    stateId,
    query,
    verbose,
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
      if (!data?.docSet) errors.push('useSearchForBookCodes: response from query has empty docSet.');
    };

    setState({
      stateId: queryStateId,
      query,
      data,
      bookCodes,
      errors,
      text,
      docSetId,
    });
  }, [data, queryStateId, query]);

  useDeepCompareEffect(() => {
    const changed = (
      state.stateId !== queryStateId ||
      state.query !== query ||
      state.data !== data
    );
    if (changed && query.length > 0) {
      if (verbose) console.log('useSearchForBookCodes.useEffect() stateId: ' + queryStateId);
      parse();
    };
  }, [state.stateId, queryStateId, parse, query, state.query, state.data, data]);

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
  /** console log details */
  verbose: PropTypes.bool,
};

useSearchForBookCodes.defaultProps = {
  proskomma: undefined,
  stateId: '',
  text: '',
};