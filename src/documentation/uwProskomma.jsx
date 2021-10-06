import PropTypes from 'prop-types';

export default function uwProskomma(props) {
  return (<></>);
};

uwProskomma.propTypes = {
  /** Books */
  books: PropTypes.array,
  /** Resources */
  resources: PropTypes.array,
  /** Config */
  config: PropTypes.object,
  /** Serialize true/false */
  serialize: PropTypes.bool,
};

uwProskomma.defaultProps = {
  books: [],
  resources: [],
  config: {},
  serialize: false,
};