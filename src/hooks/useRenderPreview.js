import { useState } from 'react';
import { useDeepCompareEffect } from 'use-deep-compare';
import PropTypes from 'prop-types';
import { doRender } from "proskomma-render-pdf";

const SINGLE_BOOK_CONFIG = {
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

export async function renderUsfmToHTML(pk, htmlTitle, language, direction, structure, i18n, docSetId) {
  const docSetIds = [docSetId]

  const config = {
    ...SINGLE_BOOK_CONFIG,
    title: htmlTitle,
    language,
    textDirection: direction,
    structure,
    i18n,
  };

  config.bookOutput = {};

  const config2 = await doRender(pk, config, docSetIds);
  return config2.output;
}

export default function useRenderPreview({
  proskomma, docSet, title, dir, structure, i18n, ready, language
}) {
  const [html, setHtml] = useState();
  const [rendering, setRendering] = useState(false);
  const [errors, setErrors] = useState(null);
  const [progress, setProgress] = useState(0);
  const docSetId = docSet?.id;      //TODO: verify the docSet.id
  const pk = proskomma;

  useDeepCompareEffect(async () => {
    if (ready && docSetId && pk) {
      setProgress(0)
      setErrors(null)
      setRendering(true)

      try {
        const results = await renderUsfmToHTML(pk, title, language, dir, structure, i18n, docSetId)
        setHtml(results.output)
      } catch (e) {
        setErrors(e)
      }
      setProgress(100)
      setRendering(false)
    };
  }, [ready, pk, title, language, dir, i18n, docSetId]);


  return {
    html,
    rendering,
    progress,
    errors,
  };
};

useRenderPreview.propTypes = {
  docSet: PropTypes.object,
  title: PropTypes.string,
  dir: PropTypes.any,
  structure: PropTypes.object,
  i18n: PropTypes.object,
  ready: PropTypes.bool,
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** console log details */
  verbose: PropTypes.bool,
};
