import { doRender } from "proskomma-render-pdf";

export const SINGLE_BOOK_CONFIG = {
  "title": "unfoldingWord Literal Translation",
  "language": "en",
  "textDirection": "ltr",
  "uid": "ULT",
  "structure": [
    [
      "section",
      "nt",
      [
        [
          "bookCode",
          "%bookID%"
        ]
      ]
    ]
  ],
  "i18n": {
    "notes": "Notes",
    "tocBooks": "Books of the Bible",
    "titlePage": "unfoldingWord Literal Translation: Psalms and Gospels",
    "copyright": "Licensed under a Creative Commons Attribution-Sharealike 4.0 International License",
    "coverAlt": "Cover",
    "preface": "Preface",
    "ot": "Old Testament",
    "nt": "New Testament"
  }
};

export async function renderHTML({ proskomma, language, textDirection, structure, i18n, docSetId, onProgress }) {
  let response = {};

  onProgress(1);

  const docSetIds = [docSetId]
  const testamentIds = Object.keys(structure);

  const _structure = testamentIds.map((testamentId) => {
    const testament = structure[testamentId];

    const testamentBookCodes = testament.map((bookId) => (
      ['bookCode', bookId.toUpperCase()]
    ));
    return ['section', testamentId, testamentBookCodes];
  }).filter(section => section[2].length > 0);

  const config = {
    ...SINGLE_BOOK_CONFIG,
    title: i18n.title,
    language,
    textDirection,
    structure: _structure,
    i18n,
    bookOutput: {}, //?
  };

  response = await doRender(proskomma, config, docSetIds);

  onProgress(100);

  return response;
}