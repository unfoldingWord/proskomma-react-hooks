import { useState, useEffect } from 'react';
import { useDeepCompareCallback } from 'use-deep-compare';
import PropTypes from 'prop-types';

import { searchForBlocksFilter, searchForBlocksQuery } from '../helpers/searchForBlocks';
import { useQuery } from '..';

export default function useSearchForBlocks ({
  proskomma,
  stateId,
  docSetId,
  bookCode,
  text,
  tokens,
}) {
  const cleanState = {
    query: '',
    bookCodes: [],
    stateId: 0,
    errors: [],
    data: {},
  };
  const [state, setState] = useState({ ...cleanState });

  const query = searchForBlocksQuery({ text, docSetId, bookCode, tokens });

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
    let blocks = [];
    let errors = [...queryErrors];

    if (errors.length < 1) {
      blocks = searchForBlocksFilter({data});
    };

    setState({
      stateId: queryStateId,
      query,
      data,
      blocks,
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

useSearchForBlocks.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
  /** The docSetId to know which document to search, ie. "unfoldingword/en_ult" */
  docSetId: PropTypes.string,
  /** The bookCode to know which document to search, ie. "unfoldingword/en_ult" */
  bookCode: PropTypes.string,
  /** Include tokens */
  tokens: PropTypes.bool,
  /** Text to search for */
  text: PropTypes.string,
};

useSearchForBlocks.defaultProps = {
  proskomma: undefined,
  stateId: 0,
  text: '',
  tokens: false,
};