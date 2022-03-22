# useRenderPreview

```js
import { useState } from 'react';
import { useProskomma, useImport, useCatalog, useRenderPreview } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';
import { useDeepCompareMemo } from 'use-deep-compare';

const document = ({bookCode, bookName, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, paragraphStartChapter: true, ...props }),
  bookCode, 
});

const documents = [
  document({ bookCode: 'psa', testament: 'ot', bookName: 'Psalms', chapterCount: 119 }),
  document({ bookCode: 'mat', testament: 'nt', bookName: 'Matthew', chapterCount: 28 }),
  document({ bookCode: 'mrk', testament: 'nt', bookName: 'Mark', chapterCount: 16 }),
  document({ bookCode: 'luk', testament: 'nt', bookName: 'Luke', chapterCount: 24 }),
  document({ bookCode: 'jhn', testament: 'nt', bookName: 'John', chapterCount: 21 }),
];

const structure = { ot: [], nt: [] };

documents.forEach(({bookCode, testament}) => {
  structure[testament].push(bookCode);
});

// const structure = {
//   ot: [
//     'psa',
//   ],
//   nt: [
//     'mat',
//     'mrk',
//     'luk',
//     'jhn',
//   ]
// };

const verbose = false;

function Component () {
  const [startImport, setStartImport] = useState(false);
  const [startRender, setStartRender] = useState(false);

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

  const i18n = {
    notes: "Notes",
    tocBooks: "Books of the Bible",
    titlePage: "unfoldingWord Literal Translation: Psalms and Gospels",
    copyright: "Licensed under a Creative Commons Attribution-Sharealike 4.0 International License",
    coverAlt: "Cover",
    preface: "Preface",
    ot: "Old Testament",
    nt: "New Testament"
  };

  const {
    html, // dummy output
    rendering, // dummy timer for simulating false, true, false.
    progress, // dummy 0...50...100
    errors, // caught and floated up
  } = useRenderPreview({
    ...prokommaHook,
    docSet, // docset provides language and docSetId to potentially query, and build structure
    title,
    direction,
    structure, // generate structure from docSet
    i18n,
    ready: startRender, // bool to allow render to run, don't run until true and all content is present
    verbose,
  });

  return (
    <>
      <button style={{margin: '1em'}} onClick={() => {setStartImport(true);}}>Import</button>
      <button style={{margin: '1em'}} onClick={() => {setStartRender(true);}}>Render</button>
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
