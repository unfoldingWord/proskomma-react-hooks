import React from 'react';
import PropTypes from 'prop-types';

export default function useQuery() {
  return (<></>);
};

useQuery.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
  /** GraphQL Query to run */
  query: PropTypes.string,
};

useQuery.defaultProps = {
  proskomma: undefined,
  stateId: '',
  query: '',
};