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

export async function renderUsfmToHTML({ proskomma, htmlTitle, language, direction, structure, i18n, docSetId }) {
  let response = {};

  const docSetIds = [docSetId]
  const testamentIds = Object.keys(structure);

  const _structure = testamentIds.map((testamentId) => {
    const testament = structure[testamentId];

    const _testament = testament.map((bookId) => (
      ['bookCode', bookId.toUpperCase()]
    ));
    return ['section', testamentId, _testament];
  });

  const config = {
    ...SINGLE_BOOK_CONFIG,
    title: htmlTitle,
    language,
    textDirection: direction,
    structure: _structure,
    i18n,
  };

  config.bookOutput = {};

  response = await doRender(proskomma, config, docSetIds);

  return response;
}