import { useState, useEffect, useMemo } from 'react';
import { useDeepCompareCallback } from 'use-deep-compare';
import PropTypes from 'prop-types';

import { searchForBlocksFilter, searchForPassagesQuery, searchForVersesFilter } from '../helpers/searchForPassages';
import { useQuery } from '..';

export default function useSearchForPassagesByBookCode ({
  proskomma,
  stateId,
  docSetId,
  bookCode,
  text,
  tokens,
  blocks,
  verbose,
}) {
  const cleanState = {
    stateId: '',
    docSetId: null,
    bookCode: null,
    text: null,
    tokens: null,
    blocks: null,
    query: '',
    passages: [],
    errors: [],
    data: {},
  };
  const [state, setState] = useState(cleanState);

  const query = useMemo(() => {
    let _query = state.query;
    if (text && docSetId && bookCode) {
      _query = searchForPassagesQuery({ text, docSetId, bookCode, tokens, blocks });
    };
    return _query;
  }, [state.query, blocks, bookCode, docSetId, text, tokens]);

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
    let passages = [];
    let errors = [...queryErrors];

    if (data && errors.length < 1) {
      passages = blocks ? searchForBlocksFilter({data}) : searchForVersesFilter({data});
    };

    setState({
      ...cleanState,
      stateId: queryStateId,
      passages,
      bookCode,
      query,
      data,
      errors,
    });
  }, [data, queryStateId, blocks]);

  useEffect(() => {
    const changedInput = (
      state.stateId !== queryStateId ||
      state.docSetId !== docSetId ||
      state.bookCode !== bookCode ||
      state.text !== text ||
      state.tokens !== tokens ||
      state.blocks !== blocks
    );
    if (changedInput) {
      if (verbose) console.log('useSearchForPassagesByBookCode.useEffect() stateId: ' + queryStateId);
      parse();
    };
  }, [verbose, state.stateId, queryStateId, parse, state.docSetId, state.bookCode, state.text, state.tokens, state.blocks, docSetId, bookCode, text, tokens, blocks]);

  return state;
};

useSearchForPassagesByBookCode.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object.isRequired,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string.isRequired,
  /** The docSetId to know which docSet to search, ie. "unfoldingword/en_ult" */
  docSetId: PropTypes.string.isRequired,
  /** The bookCode to know which document to search, ie. "tit" */
  bookCode: PropTypes.string.isRequired,
  /** Text to search for */
  text: PropTypes.string.isRequired,
  /** Include tokens */
  tokens: PropTypes.bool,
  /** Search in blocks not verses */
  blocks: PropTypes.bool,
  /** console log details */
  verbose: PropTypes.bool,
};

useSearchForPassagesByBookCode.defaultProps = {
  proskomma: undefined,
  stateId: '',
  text: '',
  tokens: false,
  blocks: false,
};