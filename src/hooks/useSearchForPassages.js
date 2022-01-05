import PropTypes from 'prop-types';

import { useSearchForBookCodes, useSearchForPassagesByBookCodes } from '..';

export default function useSearchForPassages ({
  proskomma,
  docSetId,
  stateId,
  text,
  tokens,
  blocks,
  verbose,
}) {
  
  const {
    bookCodes,
    docSetId: bookCodesDocSetId,
    stateId: bookCodesStateId,
    errors: bookCodesErrors,
    text: bookCodesText,
  } = useSearchForBookCodes({
    proskomma,
    stateId,
    docSetId,
    text,
    verbose,
  });

  const {
    stateId: passagesStateId,
    docSetId: passagesDocSetId,
    text: passagesText,
    tokens: passagesTokens,
    blocks: passagesBlocks,
    passages,
    data,
    errors: passagesErrors,
  } = useSearchForPassagesByBookCodes({
    proskomma,
    docSetId: bookCodesDocSetId,
    stateId: bookCodesStateId,
    bookCodes,
    text: bookCodesText,
    tokens,
    blocks,
    verbose,
  });

  return {
    passages,
    data,
    bookCodes,
    stateId: passagesStateId,
    docSetId: passagesDocSetId,
    text: passagesText,
    tokens: passagesTokens,
    blocks: passagesBlocks,
    errors: [...bookCodesErrors, ...passagesErrors],
  };
};

useSearchForPassages.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object.isRequired,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string.isRequired,
  /** The docSetId to know which docSet to search, ie. "unfoldingword/en_ult" */
  docSetId: PropTypes.string.isRequired,
  /** Text to search for */
  text: PropTypes.string.isRequired,
  /** Include tokens */
  tokens: PropTypes.bool,
  /** Search in blocks not verses */
  blocks: PropTypes.bool,
  /** console log details */
  verbose: PropTypes.bool,
};

useSearchForPassages.defaultProps = {
  proskomma: undefined,
  stateId: 0,
  text: '',
  tokens: false,
  blocks: false,
};