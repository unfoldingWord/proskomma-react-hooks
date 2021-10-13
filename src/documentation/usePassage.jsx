import PropTypes from 'prop-types';

export default function usePassage(props) {
  return (<></>);
};

usePassage.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,

};

usePassage.defaultProps = {
  proskomma: undefined,
  stateId: 0,

};