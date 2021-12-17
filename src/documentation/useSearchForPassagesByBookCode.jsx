import PropTypes from 'prop-types';

export default function useSearchForPassagesByBookCode(props) {
  return (<></>);
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
  stateId: 0,
  text: '',
  tokens: false,
  blocks: false,
};