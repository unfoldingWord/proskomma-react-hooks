export const searchQuery = ({text}) => (`{  docSets {
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
} }`);