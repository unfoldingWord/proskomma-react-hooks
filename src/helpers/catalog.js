export const catalogQuery = `{
  nDocSets nDocuments
  docSets {
    id hasMapping
    documents (
      sortedBy: "paratext"
    ) {
      id
      bookCode: header(id:"bookCode")
      h: header(id:"h")
      toc: header(id:"toc")
      toc2: header(id:"toc2")
      toc3: header(id:"toc3")
    }
  }
}`;
