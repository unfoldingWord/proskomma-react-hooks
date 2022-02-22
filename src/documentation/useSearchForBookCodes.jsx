import React from 'react';
import PropTypes from 'prop-types';

export default function useSearchForBookCodes() {
  return (<></>);
};

useSearchForBookCodes.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
  /** The docSetId to know which document to search, ie. "unfoldingword/en_ult" */
  docSetId: PropTypes.string,
  /** Text to search for */
  text: PropTypes.string,
  /** console log details */
  verbose: PropTypes.bool,
};

useSearchForBookCodes.defaultProps = {
  proskomma: undefined,
  stateId: '',
  text: '',
};