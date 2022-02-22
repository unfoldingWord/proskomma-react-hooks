import React from 'react';
import PropTypes from 'prop-types';

export default function useSuccinctDocSetLoad() {
  return (<></>);
};

useSuccinctDocSetLoad.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string.isRequired,
  /** Function to trigger a new stateId onImport */
  newStateId: PropTypes.func.isRequired,
  /** Array of documents to be imported */
  succinctDocSet: PropTypes.object,
  /** console success details */
  verbose: PropTypes.bool,
};

useSuccinctDocSetLoad.defaultProps = {
  proskomma: undefined,
  stateId: '',
};