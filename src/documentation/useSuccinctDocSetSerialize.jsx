import React from 'react';
import PropTypes from 'prop-types';

export default function useSuccinctDocSetSerialize() {
  return (<></>);
};

useSuccinctDocSetSerialize.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
  /** The docSetId to know which docSet to search, ie. "unfoldingword/en_ult" */
  docSetId: PropTypes.string.isRequired,
  /** console success details */
  verbose: PropTypes.bool,
};

useSuccinctDocSetSerialize.defaultProps = {
  proskomma: undefined,
  stateId: '',
};