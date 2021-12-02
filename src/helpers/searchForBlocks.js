import {
  searchTermsClause,
  attTermsClause,
  searchTermsRegex,
} from "./search";

export const searchForBlocksQuery = ({text, docSetId, bookCode, tokens=false, }) => {
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

  const blockMatchQuery = `{
  docSet(id:"${docSetId}") {
    id
    document(
        bookCode:"${bookCode}" 
      ) {
      id
      bookCode: header(id: "bookCode")
      title: header(id: "toc2")
      mainSequence {
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
      }
    }
    matches: enumRegexIndexesForString (enumType:"wordLike" searchRegex:"${_searchTermsRegex}") { matched }
  }
}`;
  return blockMatchQuery;
};

export const searchForBlocksFilter = ({data}) => {
  let records = [];
  records = data?.docSet?.document?.mainSequence?.blocks?.map(block => {
    const docSetId = data.docSet.id;
    const bookCode = data.docSet.document.bookCode;
    const chapter = block.scopeLabels.filter(sl => sl.startsWith('chapter'))[0].split('/')[1];
    const verses = block.scopeLabels.filter(sl => sl.startsWith('verse'))
      .map(sl => sl.split('/')[1]).map(vns => parseInt(vns));
    const verse = (verses.length > 1) ? `${verses[0]}-${verses[verses.length - 1]}` : verses[0];
    const reference = `${bookCode} ${chapter}:${verse}`; // {bookCode, chapter, verse};
    // const matches = data.docSet.matches.map(m => m.matched);
    const itemGroups = block.itemGroups
    const text = itemGroups.map(itemGroup => (
      `\\v ${itemGroup.scopeLabels[0].split('/')[1]} ${itemGroup.text}`)
    ).join(' ');

    return {
      docSetId,
      reference,
      text,
    };
  });
  return records;
};

// export const parseBlock = ({block, bookCode, docSetId}) => {
//   let row = {};
//   const { scopeLabels: labels } = block;
//   const chapter = labels?.filter((sl) => sl.startsWith('chapter'))[0].split('/')[1];
//   const verses = labels?.filter((sl) => sl.startsWith('verses')).map(v => v.split('/')[1]);
//   const verse = (verses.length > 1) ? `${verses[0]}-${verses[verses.length - 1]}` : verses[0];
//   const reference = `${bookCode} ${chapter}:${verse}`; // {bookCode, chapter, verse};
//   const text = block?.tokens.map((token) => Object.values(token)).join('');

//   row = {docSetId, reference, text};
//   return row;
// };