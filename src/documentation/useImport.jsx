import React from 'react';
import PropTypes from 'prop-types';

export default function useImport() {
  return (<></>);
};


useImport.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Function to trigger a new stateId onImport */
  newStateId: PropTypes.func.isRequired,
  /** Callback when document is imported, props={org, lang, abbr, bookCode} */
  onImport: PropTypes.func,
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
      bookCode: PropTypes.string,
      /** USFM string for the book */
      data: PropTypes.string.isRequired,
    }),
  ),
  /** console success details */
  verbose: PropTypes.bool,
};
