import PropTypes from 'prop-types';

export default function useQuery(props) {
  return (<></>);
};

useQuery.propTypes = {
  /** Books */
  books: PropTypes.array,
  /** Resources */
  resources: PropTypes.array,
  /** Config */
  config: PropTypes.object,
  /** Serialize true/false */
  serialize: PropTypes.bool,
};

useQuery.defaultProps = {
  books: [],
  resources: [],
  config: {},
  serialize: false,
};