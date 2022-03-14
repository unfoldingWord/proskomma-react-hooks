export const passageQuery = ({
  reference,
  bookCode: _bookCode,
  chapterVerses: _chapterVerses,
  chapter: _chapter,
}) => {
  let query;
  let bookCode = _bookCode;
  let chapterVerses = _chapterVerses;
  let chapter = _chapter;

  if (reference) {
    const parsed = parseReferenceString(reference);
    bookCode = parsed.bookCode;
    chapterVerses = parsed.chapterVerses;
    chapter = parsed.chapter;
  };

  let _scope = scope({ bookCode });

  let clause = (chapterVerses) ?
    chapterVersesClause({ chapterVerses }) :
    chapterClause({ bookCode, chapter });

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
  const regex = /(?<bookCode>[\d\w]\w{2}) (?<cv>(?<c>\d+):?(?<v>[\d-]*))/;
  const { bookCode, cv, c, v } = reference.match(regex).groups || {};
  response.bookCode = bookCode;

  if (cv.includes(':') && !!v) {
    response.chapterVerses = cv;
  } else if (!!c && !v) {
    response.chapter = c;
  };

  return response;
};

const scope = ({ bookCode }) => `documents ( withBook: "${bookCode}" )`;

const chapterVersesClause = ({ chapterVerses }) => `chapterVerses: "${chapterVerses}"`;

const chapterClause = ({ chapter }) => `chapter: "${chapter}"`;

export const parsePassageResponse = ({ bookCode, data }) => {
  let passages = [];

  data.documents.forEach((doc) => {
    doc.cv.forEach(({ scopeLabels, text }) => {
      const { chapter, verse } = parseScopeLabels({ scopeLabels });
      const verseReference = verse ? `:${verse}` : '';
      const passage = {
        docSetId: doc.docSetId,
        reference: `${bookCode} ${chapter}${verseReference}`,
        text,
      };
      passages = [...passages, passage];
    });
  });
  return passages;
};

export const parseScopeLabels = ({ scopeLabels }) => {
  const chapter = scopeLabels?.filter((sl) => sl.startsWith('chapter'))[0].split('/')[1];
  const verses = scopeLabels?.filter((sl) => sl.startsWith('verse')).map(v => v.split('/')[1]);
  const verse = verses[verses.length - 1];

  return { chapter, verse };
};