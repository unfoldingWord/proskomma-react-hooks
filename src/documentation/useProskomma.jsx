import PropTypes from 'prop-types';

export default function useProskomma(props) {
  return (<></>);
};

useProskomma.propTypes = {
  /** Array of documents to be imported */
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      /** { org, lang, abbr } */
      selectors: PropTypes.shape({
        /** Selector: Organization or Owner for context */
        org: PropTypes.string.isRequired,
        /** Selector: Language abbreviation */
        lang: PropTypes.string.isRequired,
        /** Selector: Abbreviation for Bible Translation (ULT) */
        abbr: PropTypes.string.isRequired,
      }),
      /**  */
      bookId: PropTypes.string,
      /** USFM string for the book */
      data: PropTypes.string.isRequired,
    })
  ),
  /** Serialize true/false */
  serialize: PropTypes.bool,
  /** console success details */
  verbose: PropTypes.bool,
};
