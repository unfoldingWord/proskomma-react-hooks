# useRenderPreview

```js
import { useState, useEffect, useCallback } from 'react';
import { useProskomma, useImport, useCatalog, useRenderPreview } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';
import { useDeepCompareMemo } from 'use-deep-compare';

// const document = ({bookCode, bookName, testament, ...props}) => ({
//   selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' },
//   data: loremIpsumBook({ bookCode, bookName, paragraphStartChapter: true, ...props }),
//   bookCode,
//   testament,
// });

// const documents = [
//   document({ bookCode: 'psa', testament: 'ot', bookName: 'Psalms', chapterCount: 119 }),
//   document({ bookCode: 'mat', testament: 'nt', bookName: 'Matthew', chapterCount: 28 }),
//   document({ bookCode: 'mrk', testament: 'nt', bookName: 'Mark', chapterCount: 16 }),
//   document({ bookCode: 'luk', testament: 'nt', bookName: 'Luke', chapterCount: 24 }),
//   document({ bookCode: 'jhn', testament: 'nt', bookName: 'John', chapterCount: 21 }),
// ];


// const ipsumDocument = ({bookCode, bookName, testament, ...props}) => ({
//   selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
//   data: loremIpsumBook({ bookCode, bookName, paragraphStartChapter: true, ...props }),
//   bookCode,
//   testament,
// });

const urlDocument = ({ selectors, bookCode, bookName, testament, filename, ...props}) => ({
  selectors,
  bookCode,
  testament,
  url: `https://git.door43.org/${selectors.org}/${selectors.lang}_${selectors.abbr}/raw/branch/master/${filename}`,
});

const documents = [
  urlDocument({
    selectors: { org: 'unfoldingWord', lang: 'en', abbr: 'ult' },
    bookCode: 'rut', filename: '08-RUT.usfm', testament: 'ot',
  }),
  // urlDocument({ 
  //   selectors: { org: 'unfoldingWord', lang: 'en', abbr: 'ult' },
  //   bookCode: 'mat', filename: '41-MAT.usfm', testament: 'nt',
  // }),
  urlDocument({
    selectors: { org: 'unfoldingWord', lang: 'en', abbr: 'ult' },
    bookCode: 'mrk', filename: '42-MRK.usfm', testament: 'nt',
  }),
  urlDocument({
    selectors: { org: 'unfoldingWord', lang: 'en', abbr: 'ult' },
    bookCode: 'luk', filename: '43-LUK.usfm', testament: 'nt',
  }),
  // urlDocument({
  //   selectors: { org: 'unfoldingWord', lang: 'en', abbr: 'ult' },
  //   bookCode: 'jhn', filename: '44-JHN.usfm', testament: 'nt',
  // }),
  // ipsumDocument({ bookCode: 'psa', testament: 'ot', bookName: 'Psalms', chapterCount: 119 }),
  // ipsumDocument({ bookCode: 'mat', testament: 'nt', bookName: 'Matthew', chapterCount: 28 }),
  // ipsumDocument({ bookCode: 'mrk', testament: 'nt', bookName: 'Mark', chapterCount: 16 }),
  // ipsumDocument({ bookCode: 'luk', testament: 'nt', bookName: 'Luke', chapterCount: 24 }),
  // ipsumDocument({ bookCode: 'jhn', testament: 'nt', bookName: 'John', chapterCount: 21 }),
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
  const _documents = startImport ? documents : [];

  const proskommaHook = useProskomma({
    verbose,
  });
  
  const importHook = useImport({
    ...proskommaHook,
    documents: _documents,
    ready: startImport,
    verbose,
  });

  const catalogHook = useCatalog({
    ...proskommaHook,
    cv: !importHook.importing,
    verbose,
  });

  const docSetId = 'unfoldingWord/en_ult';

  const {
    html, // dummy output (currently <html><head>...</head><body>...</body></html>)
    rendering, // dummy timer for simulating false, true, false.
    progress, // dummy 0...50...100
    errors, // caught and floated up
  } = useRenderPreview({
    ...proskommaHook,
    docSetId, // docset provides language and docSetId to potentially query, and build structure
    language: 'en',
    textDirection: 'ltr',
    structure, // eventually generate structure from catalog
    i18n,
    ready: importHook.done, // bool to allow render to run, don't run until true and all content is present
    // pagedJS, // is this a link or a local file?
    // css, // 
    // htmlFragment, // show full html or what's in the body
    verbose,
  });

  //TODO: Make this an action returned by hook. { state, actions: { renderPreview } }
  const onPreviewClick = useCallback(() => {
    if (html && progress === 100) {
      const newStyles = `
      body {
        margin: 0;
        background: grey;
      }
      .pagedjs_pages {
      }
      .pagedjs_page {
        background: white;
        margin: 1em;
      }
      .pagedjs_right_page {
        float: right;
      }
      .pagedjs_left_page {
        float: left;
      }
      div#page-2 {
        clear: right;
      }
      `;
      const styles = newStyles + html.replace(/^[\s\S]*<style>/, "").replace(/<\/style>[\s\S]*/, "");
      const body = html.replace(/^[\s\S]*<body>/, "").replace(/<\/body>[\s\S]*/, "");
      try {
        const newPage = window.open('','','location=no,toolbar=no,menubar=no,');
        newPage.document.head.innerHTML = "<title>PDF Preview</title>";
        const style = newPage.document.createElement('style');
        style.innerHTML = styles;
        newPage.document.head.appendChild(style);
        newPage.document.body.innerHTML = body;
        const script = newPage.document.createElement('script');
        script.src = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js';
        newPage.document.head.appendChild(script);
      } catch (e) {
        debugger
      };
    };
  }, [html, rendering, progress]);

  return (
    <>
      <button style={{ margin: '1em' }} onClick={() => { setStartImport(true); }}>Import</button>
      <button style={{ margin: '1em' }} disabled={ progress !== 100 } onClick={onPreviewClick}>Render</button>
      <h3>catalogHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={catalogHook}
        theme='monokai'
        collapsed='5'
      />
      <h3>renderPreviewHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={{
          html,
          rendering,
          progress,
          errors,
        }}
        theme='monokai'
        collapsed='5'
      />
    </>
  );
};

<Component />
```
