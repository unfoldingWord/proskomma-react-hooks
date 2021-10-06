import PropTypes from 'prop-types';

export default function usePassageFilter(props) {
  return (<></>);
};

usePassageFilter.propTypes = {
  /** Result from Proskomma GraphQL Query */
  data: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  changeIndex: PropTypes.string,
};

usePassageFilter.defaultProps = {
  data: {},
  changeIndex: 0,
};