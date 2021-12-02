import PropTypes from 'prop-types';

export default function useSearchForBlocks(props) {
  return (<></>);
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