# useRenderPreview

```js
import { useState, useEffect } from 'react';
import { useProskomma, useImport, useCatalog, useRenderPreview } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';
import { useDeepCompareMemo } from 'use-deep-compare';

const document = ({bookCode, bookName, testament, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' },
  data: loremIpsumBook({ bookCode, bookName, paragraphStartChapter: true, ...props }),
  bookCode,
  testament,
});

const documents = [
  document({ bookCode: 'psa', testament: 'ot', bookName: 'Psalms', chapterCount: 119 }),
  document({ bookCode: 'mat', testament: 'nt', bookName: 'Matthew', chapterCount: 28 }),
  document({ bookCode: 'mrk', testament: 'nt', bookName: 'Mark', chapterCount: 16 }),
  document({ bookCode: 'luk', testament: 'nt', bookName: 'Luke', chapterCount: 24 }),
  document({ bookCode: 'jhn', testament: 'nt', bookName: 'John', chapterCount: 21 }),
];

const structure = { ot: [], nt: [] };


const i18n = {
  // coverAlt: "Cover",
  title: "unfoldingWord Literal Translation: Psalms and Gospels",
  titlePage: "unfoldingWord Literal Translation: Psalms and Gospels",
  copyright: "Licensed under a Creative Commons Attribution-Sharealike 4.0 International License",
  // preface: "Preface",
  tocBooks: "Books of the Bible",
  ot: "Old Testament",
  nt: "New Testament"
  // notes: "Notes",
};

documents.forEach(({bookCode, testament}) => {
  structure[testament].push(bookCode);
});

const verbose = true;

function Component () {
  const [startImport, setStartImport] = useState(false);
  const [startRender, setStartRender] = useState(false);

  const proskommaHook = useProskomma({
    verbose,
  });
  
  const importHook = useImport({
    ...proskommaHook,
    documents: documents,
    ready: startImport,
    verbose,
  });

  const catalogHook = useCatalog({
    ...proskommaHook,
    cv: !importHook.importing,
    verbose,
  });

  const docSetId = 'unfoldingWord/lat_lor';

  const {
    html, // dummy output (currently <html><head>...</head><body>...</body></html>)
    rendering, // dummy timer for simulating false, true, false.
    progress, // dummy 0...50...100
    errors, // caught and floated up
  } = useRenderPreview({
    ...proskommaHook,
    docSetId, // docset provides language and docSetId to potentially query, and build structure
    language: 'lat',
    textDirection: 'ltr',
    structure, // eventually generate structure from catalog
    i18n,
    ready: startRender, // bool to allow render to run, don't run until true and all content is present
    // pagedJS, // is this a link or a local file?
    // css, // 
    // htmlFragment, // show full html or what's in the body
    verbose,
  });

  //TODO: Make this an action returned by hook. { state, actions: { renderPreview } }
  useEffect(() => {
    if (html) {
      const newPage = window.open('','','_window');
      newPage.document.head.innerHTML = "<title>PDF Preview</title>";
      const script = newPage.document.createElement('script');
      script.src = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js';
      newPage.document.head.appendChild(script);
      const style = newPage.document.createElement('style');
      const newStyles = `
      html { background: grey; }
      .pagedjs_right_page { float: right; }
      .pagedjs_left_page { float: left; }
      .pagedjs_page { background: white; margin: 1em; }
      `;
      style.innerHTML = newStyles + html.replace(/^[\s\S]*<style>/, "").replace(/<\/style>[\s\S]*/, "");
      newPage.document.head.appendChild(style);
      newPage.document.body.innerHTML = html.replace(/^[\s\S]*<body>/, "").replace(/<\/body>[\s\S]*/, "");
    };
  }, [html]);

  return (
    <>
      <button style={{ margin: '1em' }} onClick={() => { setStartImport(true); }}>Import</button>
      <button style={{ margin: '1em' }} onClick={() => { setStartRender(true); }}>Render</button>
      <h3>catalogHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={catalogHook}
        theme='monokai'
        collapsed='5'
      />
    </>
  );
};

<Component />
```
