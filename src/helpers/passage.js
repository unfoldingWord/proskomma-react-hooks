export const passageQuery = ({ bookId, chapterVerses, chapter, verse }) => {

  let _scope = scope({bookId});

  let clause = (chapterVerses) ? 
    chapterVersesClause({chapterVerses}) : 
    referenceClause({bookId, chapter, verse});

  const query = `{
    ${_scope} {
      cv ( ${clause} ) { scopeLabels text }
    }
  }`;

  return query;
};

export const chapterVersesQuery = ({bookId, chapterVerses}) => {

};

const scope = ({bookId}) => `documents(withBook: "${bookId}")`;

const chapterVersesClause = ({chapterVerses}) => `chapterVerses:"${chapterVerses}"`;

const referenceClause = ({chapter, verse}) => `chapter: "${chapter}" verses: ["${verse}"]`;

export const parsePassageResponse = ({ bookId, data }) => {
  let passages = [];
  data.documents.forEach((doc) => {
    doc.cv.forEach(({scopeLabels, text}) => {
      const {chapter, verse} = parseScopeLabels({scopeLabels});
      const passage = {
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