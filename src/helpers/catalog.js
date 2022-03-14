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
