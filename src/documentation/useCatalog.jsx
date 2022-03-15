import React from 'react';
import PropTypes from 'prop-types';

export default function useCatalog() {
  return (<></>);
};

useCatalog.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
  /** Include chapter and verse details */
  cv: PropTypes.bool,
};

useCatalog.defaultProps = {
  proskomma: undefined,
  stateId: '',
  cv: true,
};