import React from 'react';
import PropTypes from 'prop-types';

export default function useProskomma() {
  return (<></>);
};

useProskomma.propTypes = {
  /** console log details */
  verbose: PropTypes.bool,
  /** Document Selectors uW: {org, lang, abbr} vs {lang, abbr} and other differences.  */
  unfoldingWord: PropTypes.bool,
};

useProskomma.defaultProps = {
  unfoldingWord: true,
};