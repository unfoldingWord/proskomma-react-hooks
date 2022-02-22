import {
  searchTermsClause,
  attTermsClause,
  searchTermsRegex,
} from './search';

export const searchForPassagesQuery = ({
  text, docSetId, bookCode, blocks = false, tokens = false,
}) => {
  const _searchTermsClause = searchTermsClause(text);
  const _attTermsClause = attTermsClause(text);
  const _searchTermsRegex = searchTermsRegex(text);

  const _tokensClause = tokens ? `tokens {
              subType
              payload
              scopes(
                startsWith:[
                  "attribute/spanWithAtts/w/"
                  "attribute/milestone/zaln/"
                ]
              )
            }
`: '';

  const _blocksClause = `mainSequence {
        blocks(
          allChars : true
          withMatchingChars: [${_searchTermsClause}]
          withScopes: [${_attTermsClause}]
        ) {
          scopeLabels(startsWith:["chapter/", "verse/"])
          itemGroups(byScopes:["chapter/", "verses/"], includeContext:true) {
            scopeLabels(startsWith:["verses/"])
            text
            ${_tokensClause}          }
        }
      }`;

  const _versesClause = `cvMatching(
        allChars : true
        allScopes : true
        withMatchingChars: [${_searchTermsClause}]
        withScopes: [${_attTermsClause}]
      ) {
        scopeLabels(startsWith:["chapter/", "verse/"])
        text
        ${_tokensClause}      }`;

  const _blocksOrVersesClause = blocks ? _blocksClause : _versesClause;

  const blockMatchQuery = (
    `{
  docSet(id:"${docSetId}") {
    id
    document(
      bookCode:"${bookCode?.toUpperCase()}" 
    ) {
      id
      bookCode: header(id: "bookCode")
      ${_blocksOrVersesClause}
    }
    matches: enumRegexIndexesForString (enumType:"wordLike" searchRegex:"${_searchTermsRegex}") { matched }
  }
}`
  );
  return blockMatchQuery;
};

export const searchForBlocksFilter = ({ data }) => {
  let passages = [];

  passages = data?.docSet?.document?.mainSequence?.blocks?.map(block => {
    const docSetId = data.docSet.id;
    const bookCode = data.docSet.document.bookCode;
    const chapter = block.scopeLabels.filter(sl => sl.startsWith('chapter'))[0].split('/')[1];
    const verses = block.scopeLabels.filter(sl => sl.startsWith('verse'))
      .map(sl => sl.split('/')[1]).map(vns => parseInt(vns));
    const verse = (verses.length > 1) ? `${verses[0]}-${verses[verses.length - 1]}` : verses[0];
    const reference = `${bookCode} ${chapter}:${verse}`; // {bookCode, chapter, verse};
    // const matches = data.docSet.matches.map(m => m.matched);
    const itemGroups = block.itemGroups;
    const text = itemGroups.map(itemGroup => itemGroup.text).join(' ');

    return {
      docSetId,
      reference,
      text,
    };
  });
  return passages;
};

export const searchForVersesFilter = ({ data }) => {
  let passages = [];

  passages = data?.docSet?.document?.cvMatching?.map(cvMatch => {
    const docSetId = data.docSet.id;
    const bookCode = data.docSet.document.bookCode;
    const chapter = cvMatch.scopeLabels.filter(sl => sl.startsWith('chapter'))[0].split('/')[1];
    const verses = cvMatch.scopeLabels.filter(sl => sl.startsWith('verse'))
      .map(sl => sl.split('/')[1]).map(vns => parseInt(vns));
    const verse = (verses.length > 1) ? `${verses[0]}-${verses[verses.length - 1]}` : verses[0];
    const reference = `${bookCode} ${chapter}:${verse}`; // {bookCode, chapter, verse};
    // const matches = data.docSet.matches.map(m => m.matched);
    const text = cvMatch.text;

    return {
      docSetId,
      reference,
      text,
    };
  });
  return passages;
};