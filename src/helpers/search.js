export const searchQuery = ({text}) => (`{
  docSets {
    id
    documents(        withChars: ["${text}"]
        allChars:false
      ) {
      id
      bookCode: header(id: "bookCode")
      title: header(id: "toc1")
      mainSequence {
        blocks(
          withChars: ["${text}"]
          allChars:false
        ) {
          scopeLabels tokens { payload }
        }
      }
    }
    matches: enumRegexIndexesForString (enumType:"wordLike" searchRegex:"(^${text}$)") { matched }
  } 
}`);

export const parseSearchResponse = ({data}) => {
  let rows = [];

  data?.docSets?.forEach((docSet) => {
    const docSetRows = parseDocSet({docSet});
    rows = [...rows, ...docSetRows];
  });

  return rows;
};

export const parseDocSet = ({docSet}) => {
  let rows = [];
  const docSetId = docSet?.id;
  docSet?.documents?.forEach((doc) => {
    const docRows = parseDoc({doc, docSetId});
    rows = [...rows, ...docRows];
  });

  return rows;
};

export const parseDoc = ({doc, docSetId}) => {
  const rows = [];
  const {bookCode} = doc;

  doc?.mainSequence?.blocks?.forEach((block) => {
    const row = parseBlock({block, bookCode, docSetId});
    rows.push(row);
  });

  return rows;
};

export const parseBlock = ({block, bookCode, docSetId}) => {
  let row = {};
  const { scopeLabels: labels } = block;
  const chapter = labels?.filter((sl) => sl.startsWith('chapter'))[0].split('/')[1];
  const verses = labels?.filter((sl) => sl.startsWith('verses')).map(v => v.split('/')[1]);
  const verse = (verses.length > 1) ? `${verses[0]}-${verses[verses.length - 1]}` : verses[0];
  const reference = `${bookCode} ${chapter}:${verse}`; // {bookCode, chapter, verse};
  const text = block?.tokens.map((token) => Object.values(token)).join('');

  row = {docSetId, reference, text};
  return row;
};