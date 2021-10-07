import PropTypes from 'prop-types';

export default function useQuery(props) {
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
  stateId: 0,
  query: '',
};