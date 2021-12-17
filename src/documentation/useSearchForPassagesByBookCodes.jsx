import PropTypes from 'prop-types';

export default function useSearchForPassagesByBookCodes(props) {
  return (<></>);
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