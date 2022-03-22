import React from 'react';
import PropTypes from 'prop-types';

export default function useRenderPreview() {
  return (<></>);
};

useRenderPreview.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
};

useRenderPreview.defaultProps = {
  proskomma: undefined,
  stateId: '',
};