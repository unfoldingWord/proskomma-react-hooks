import { useState, useEffect } from 'react';
import { useDeepCompareCallback, useDeepCompareEffect } from 'use-deep-compare';
import PropTypes from 'prop-types';

import { useSearchForPassagesByBookCode } from '..';

export default function useSearch ({
  proskomma,
  docSetId,
  bookCodes,
  stateId,
  text,
  tokens,
  blocks,
}) {
  const [bookCodesQueue, setBookCodesQueue] = useState([]);
  const [nextBookCode, setNextBookCode] = useState();
  const [passages, setPassages] = useState([]);

  const {
    passages: passagesByBookCode,
    stateId: passagesStateId,
    bookCode: lastBookCode,
  } = useSearchForPassagesByBookCode({
    proskomma,
    stateId,
    docSetId,
    bookCode: nextBookCode,
    text,
    tokens,
    blocks,
  });

  const getNextBookCodeFromQueue = useDeepCompareCallback(() => {
    const nextBookCodesQueue = [...bookCodesQueue];
    const nextBookCode = nextBookCodesQueue.shift();
    setBookCodesQueue(nextBookCodesQueue);
    return nextBookCode;
  }, [bookCodesQueue]);

  const getNextBookCode = useDeepCompareCallback(() => {
    const _nextBookCode = getNextBookCodeFromQueue();
    if (nextBookCode !== _nextBookCode) {
      setNextBookCode(_nextBookCode);
    };
  }, [bookCodesQueue, nextBookCode]);

  // 1. Queue if bookCodes, docSetId or stateId changes
  useDeepCompareEffect(() => {
    if (docSetId && stateId) {
      setBookCodesQueue(bookCodes);
    };
  }, [bookCodes, docSetId, stateId]);

  // 2. Use the first book off the queue fist time around
  useDeepCompareEffect(() => {
    if (bookCodes === nextBookCode) {
      getNextBookCode();
    };
  }, [bookCodes, nextBookCode, getNextBookCode]);

  // 3. Use the first book off the queue fist time around
  useEffect(() => {
    if (lastBookCode !== nextBookCode) {
      getNextBookCode();
    };
  }, [nextBookCode, lastBookCode, getNextBookCode]);

  return {
    passages,
  };
};

useSearch.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
  /** Text to search for */
  text: PropTypes.string,
};

useSearch.defaultProps = {
  proskomma: undefined,
  stateId: 0,
  text: '',
};