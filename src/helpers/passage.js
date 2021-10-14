export const passageQuery = ({
  reference,
  bookId: _bookId,
  chapterVerses: _chapterVerses,
  chapter: _chapter,
  verse: _verse,
}) => {
  let query;
  let bookId = _bookId;
  let chapterVerses = _chapterVerses;
  let chapter = _chapter;
  let verse = _verse;

  if (reference) {
    const parsed = parseReferenceString(reference);
    bookId = parsed.bookId;
    chapterVerses = parsed.chapterVerses;
    chapter = parsed.chapter;
    verse = parsed.verse;
  };

  let _scope = scope({bookId});

  let clause = (chapterVerses) ? 
    chapterVersesClause({chapterVerses}) : 
    referenceClause({bookId, chapter, verse});

  query = `{
    ${_scope} {
      docSetId
      cv ( ${clause} ) { scopeLabels text }
    }
  }`;

  return query;
};

export const parseReferenceString = (reference) => {
  let response = {};
  // 3JN 1:1-2 PSA 119:100 MAT 1-2
  const regex = /(?<bookId>[\d\w]\w{2}) (?<cv>[\d:-]+)/;
  const {bookId, cv} = reference.match(regex).groups;
  response.bookId = bookId;

  if (cv.includes('-')) {
    response.chapterVerses = cv;
  } else if (cv.includes(':')) {
    const regex = /(?<chapter>\d+):(?<verse>\d+)/;
    const { groups } = cv.match(regex);
    response.chapter = groups.chapter;
    response.verse = groups.verse;
  };

  return response;
};

const scope = ({bookId}) => `documents ( withBook: "${bookId}" )`;

const chapterVersesClause = ({chapterVerses}) => `chapterVerses: "${chapterVerses}"`;

const referenceClause = ({chapter, verse}) => `chapter: "${chapter}" verses: ["${verse}"]`;

export const parsePassageResponse = ({ bookId, data }) => {
  let passages = [];
  data.documents.forEach((doc) => {
    doc.cv.forEach(({scopeLabels, text}) => {
      const {chapter, verse} = parseScopeLabels({scopeLabels});
      const passage = {
        docSetId: doc.docSetId,
        reference: `${bookId} ${chapter}:${verse}`,
        text,
      };
      passages = [...passages, passage];
    });
  });
  return passages;
};

export const parseScopeLabels = ({scopeLabels}) => {
  const chapter = scopeLabels?.filter((sl) => sl.startsWith('chapter'))[0].split('/')[1];
  const verses = scopeLabels?.filter((sl) => sl.startsWith('verse')).map(v => v.split('/')[1]);
  const verse = (verses.length > 1) ? `${verses[0]}-${verses[verses.length - 1]}` : verses[0];

  return {chapter, verse};
};