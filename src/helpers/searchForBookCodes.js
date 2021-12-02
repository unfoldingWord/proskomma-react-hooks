import {
  searchTermsClause,
  attTermsClause,
} from "./search";

export const searchForBookCodesQuery = ({text, docSetId, }) => {
  const _searchTermsClause = searchTermsClause(text);
  const _attTermsClause = attTermsClause(text);

  const bookCodeMatchQuery = `{
    docSet( id:"${docSetId}" ) {
      documents(
        sortedBy: "paratext"
        allChars: true
        allScopes: true
        withMatchingChars: [${_searchTermsClause}]
${(_attTermsClause.length > 0) ?
`        withScopes: [${_attTermsClause}]
` : ''
}      ) {
        bookCode: header( id:"bookCode" ) 
      }
    }
  }`;
  return bookCodeMatchQuery;
};

export const searchForBookCodesFilter = ({data}) => {
  return data?.docSet?.documents?.map((book) => book.bookCode);
};