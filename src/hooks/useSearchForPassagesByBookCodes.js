import { useState } from 'react';
import { useDeepCompareEffect, useDeepCompareCallback } from 'use-deep-compare';
import PropTypes from 'prop-types';
import differenceWith from 'lodash.differencewith';
import isEqual from 'lodash.isequal';

import { useSearchForPassagesByBookCode } from '..';
import useBookCodeQueue from './useBookCodeQueue';

export default function useSearchForPassagesByBookCodes ({
  proskomma,
  docSetId,
  bookCodes,
  stateId,
  text,
  tokens,
  blocks,
  verbose,
}) {
  const cleanState = {
    stateId,
    docSetId,
    bookCodes,
    text,
    tokens,
    blocks,
    passages: [],
    errors: [],
    lastBookCode: null,
  };
  const [state, setState] = useState(cleanState);

  
  const refreshState = useDeepCompareCallback(() => {
    setState(cleanState);
  }, [cleanState]);
  
  // 1. if input changes, refresh state;
  useDeepCompareEffect(() => {
    const changed = (
      docSetId !== state.docSetId ||
      bookCodes !== state.bookCodes ||
      stateId !== state.stateId ||
      text !== state.text ||
      tokens !== state.tokens ||
      blocks !== state.blocks
    );

    if (changed) refreshState();
  }, [blocks, bookCodes, docSetId, refreshState, stateId, text, tokens, state]);

  const {
    nextBookCode,
    errors: queueErrors,
  } = useBookCodeQueue({bookCodes, lastBookCode: state.lastBookCode, stateId, verbose});

  const {
    passages: lastPassages,
    stateId: lastStateId,
    bookCode: lastBookCode,
    errors: lastErrors,
  } = useSearchForPassagesByBookCode({
    proskomma,
    stateId,
    docSetId,
    bookCode: nextBookCode,
    text,
    tokens,
    blocks,
  });

  // 1. useSearchForPassagesByBookCode will run each update of nextBookCode, add results
  useDeepCompareEffect(() => {
    if (lastPassages?.length && stateId === lastStateId) { // ensure stateId is up to date
      // if (lastBookCode !== nextBookCode) { // ensure its not a repeat run.
        let newPassages = differenceWith(lastPassages, state.passages, isEqual);
        const passages = [...state.passages, ...newPassages];
        const errors = [...state.errors, ...lastErrors];
        const newState = {...state, passages, lastBookCode, errors};
        if (verbose) console.log('1. Add results after useSearchForPassagesByBookCode runs on each update of nextBookCode', lastBookCode, lastPassages, newPassages);
        setState(newState);
      // };
    };
  }, [state.passages, state.errors, lastPassages, lastStateId, lastBookCode, lastErrors]);

  return state;
};

useSearchForPassagesByBookCodes.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object.isRequired,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string.isRequired,
  /** The docSetId to know which docSet to search, ie. "unfoldingword/en_ult" */
  docSetId: PropTypes.string.isRequired,
  /** The bookCodes to know which documents to search, ie. ["tit"] */
  bookCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Text to search for */
  text: PropTypes.string.isRequired,
  /** Include tokens */
  tokens: PropTypes.bool,
  /** Search in blocks not verses */
  blocks: PropTypes.bool,
  /** console log details */
  verbose: PropTypes.bool,
};

useSearchForPassagesByBookCodes.defaultProps = {
  proskomma: undefined,
  stateId: 0,
  text: '',
  tokens: false,
  blocks: false,
};