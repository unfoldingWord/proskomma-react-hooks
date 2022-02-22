import {
  useState, useEffect, useMemo,
} from 'react';
import {
  useDeepCompareEffect, useDeepCompareCallback, useDeepCompareMemo,
} from 'use-deep-compare';

export default function useSearchQueueBookCodes({
  bookCodes: _bookCodes, lastBookCode: _bookCode, stateId: _stateId,
}) {
  const cleanState = {
    stateId: _stateId,
    bookCodes: _bookCodes,
    usedBookCodes: [],
    errors: [],
  };
  const [state, setState] = useState(cleanState);

  const changedBookCodes = useDeepCompareMemo(() => (_bookCodes !== state.bookCodes), [_bookCodes, state.bookCodes]);
  const changedStateId = useMemo(() => (_stateId !== state.stateId), [_stateId, state.stateId]);

  const refreshState = useDeepCompareCallback(() => {
    setState(cleanState);
  }, [cleanState]);

  useEffect(() => {
    if (changedBookCodes || changedStateId) {
      refreshState();
    };
  }, [changedBookCodes, changedStateId, refreshState]);

  const addUsedBookCode = useDeepCompareCallback(({ bookCode }) => {
    let add = true;
    let usedBookCodes = [...state.usedBookCodes];
    let errors = [];

    const isUsed = (state.usedBookCodes.includes(bookCode));

    if (isUsed) {
      add = false && errors.push(`useBookCodeQueue.addUsedBookCode({'${bookCode}'}): bookCode isUsed.`);
    };

    if (changedStateId) {
      add = false && errors.push(`useBookCodeQueue.addUsedBookCode({'${bookCode}'}): stateId changed.`);
    };

    if (add) {
      usedBookCodes = [...usedBookCodes, bookCode];
    };

    setState({
      ...state, usedBookCodes, errors,
    });
  }, [state, changedStateId]);

  useDeepCompareEffect(() => {
    addUsedBookCode({ bookCode: _bookCode });
  }, [state, _bookCode, addUsedBookCode]);

  const bookCodesQueue = useDeepCompareMemo(() => (
    state.bookCodes.filter(bookCode => !state.usedBookCodes.includes(bookCode))
  ), [state]);

  const nextBookCode = useDeepCompareMemo(() => (
    (bookCodesQueue.length ? bookCodesQueue[0] : null)
  ), [bookCodesQueue]);

  return {
    ...state, addUsedBookCode, bookCodesQueue, nextBookCode,
  };
};