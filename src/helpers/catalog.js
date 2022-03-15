export const catalogQuery = ({ cv }) => `{
  nDocSets nDocuments
  docSets {
    id
    selectors {
      key
      value
    }
    hasMapping
    documents (
      sortedBy: "paratext"
    ) {
      id
      bookCode: header(id:"bookCode")
      h: header(id:"h")
      toc: header(id:"toc")
      toc2: header(id:"toc2")
      toc3: header(id:"toc3")${cv ? `
  cvNumbers: cvIndexes {
    chapter
    verses: verseNumbers {
      number
      range
    }
  }
` : ''
  }
    }
  }
}`;

export const parseChapterVerseMapInDocSets = ({ docSets: _docSets }) => {
  let docSets = (_docSets?.length > 0) ? JSON.parse(JSON.stringify(_docSets)) : [];

  docSets?.forEach((docSet) => {
    if (docSet?.selectors?.forEach) {
      const selectors = {};

      docSet.selectors.forEach(({ key, value }) => {
        selectors[key] = value;
      });
      docSet.selectors = selectors;
    };

    docSet.documents.forEach((document) => {
      if (document?.cvNumbers) {
        let chapterVerseMap = new Map();

        document?.cvNumbers?.forEach(({ chapter, verses }) => {
          let verseMap = new Map();

          verses.forEach(({ number, range }) => {
            verseMap.set(number, range);
          });
          chapterVerseMap.set(chapter, verseMap);
        });

        delete document.cvNumbers;
        document.chapterVerseMap = chapterVerseMap;
      };
    });
  });

  return docSets;
};