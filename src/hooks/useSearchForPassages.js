import { useState, useEffect } from 'react';
import { useDeepCompareCallback } from 'use-deep-compare';
import PropTypes from 'prop-types';

import { searchForBlocksFilter, searchForPassagesQuery, searchForVersesFilter } from '../helpers/searchForPassages';
import { useQuery } from '..';

export default function useSearchForPassages ({
  proskomma,
  stateId,
  docSetId,
  bookCode,
  text,
  tokens,
  blocks,
}) {
  const cleanState = {
    query: '',
    passages: [],
    stateId: 0,
    errors: [],
    data: {},
  };
  const [state, setState] = useState({ ...cleanState });

  const query = searchForPassagesQuery({ text, docSetId, bookCode, tokens, blocks });

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
    let passages = [];
    let errors = [...queryErrors];

    if (errors.length < 1) {
      passages = blocks ? searchForBlocksFilter({data}) : searchForVersesFilter({data});
    };

    setState({
      stateId: queryStateId,
      query,
      data,
      passages,
      errors,
    });
  }, [data, queryStateId, blocks]);

  useEffect(() => {
    if (state.stateId !== queryStateId) {
      console.log('useSearchForBookCodes.useEffect() stateId: ' + queryStateId);
      parse();
    };
  }, [state.stateId, queryStateId, parse]);

  return state;
};

useSearchForPassages.propTypes = {
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
  /** Search in blocks not verses */
  blocks: PropTypes.bool,
};

useSearchForPassages.defaultProps = {
  proskomma: undefined,
  stateId: 0,
  text: '',
  tokens: false,
  blocks: false,
};