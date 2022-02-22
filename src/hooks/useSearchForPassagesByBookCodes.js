import { useState } from 'react';
import { useDeepCompareEffect, useDeepCompareCallback } from 'use-deep-compare';
import PropTypes from 'prop-types';

import { useSearchForPassagesByBookCode } from '..';
import useSearchQueueBookCodes from './useSearchQueueBookCodes';

export default function useSearchForPassagesByBookCodes({
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
    passagesBookCodes: [],
    dataArray: [],
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

    if (changed) {
      refreshState();
    };
  }, [blocks, bookCodes, docSetId, refreshState, stateId, text, tokens, state]);

  const {
    nextBookCode,
    errors: queueErrors,
  } = useSearchQueueBookCodes({
    bookCodes, lastBookCode: state.lastBookCode, stateId, verbose,
  });

  const {
    passages: lastPassages,
    data: lastData,
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
    verbose,
  });

  // 1. useSearchForPassagesByBookCode will run each update of nextBookCode, add results
  useDeepCompareEffect(() => {
    if (lastPassages && stateId === lastStateId) { // ensure stateId is up to date
      if (lastBookCode && !state.passagesBookCodes.includes(lastBookCode)) { // ensure its not a repeat run.
        const passages = [...state.passages, ...lastPassages];
        const passagesBookCodes = [...state.passagesBookCodes, lastBookCode];
        const dataArray = [...state.dataArray, lastData];
        const errors = [...state.errors, ...queueErrors, ...lastErrors];
        const newState = {
          ...state, passages, dataArray, lastBookCode, passagesBookCodes, errors,
        };

        if (verbose) {
          console.log('useSearchForPassagesByBookCodes.useDeepCompareEffect: Add results after useSearchForPassagesByBookCode runs on each update of nextBookCode', lastBookCode, lastPassages);
        };
        setState(newState);
      };
    };
  }, [state, queueErrors, lastPassages, lastStateId, lastBookCode, nextBookCode, lastErrors]);

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
  stateId: '',
  text: '',
  tokens: false,
  blocks: false,
};