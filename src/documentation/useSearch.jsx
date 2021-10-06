import PropTypes from 'prop-types';

export default function useSearch(props) {
  return (<></>);
};

useSearch.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  changeIndex: PropTypes.string,
  /** GraphQL Query to run */
  text: PropTypes.string,
};

useSearch.defaultProps = {
  proskomma: undefined,
  changeIndex: 0,
  text: '',
};