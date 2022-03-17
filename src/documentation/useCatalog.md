# useCatalog

```js
import { useState } from 'react';
import { useProskomma, useImport, useCatalog } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';
import { useDeepCompareMemo } from 'use-deep-compare';

const document = ({bookCode, bookName, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, paragraphStartChapter: true, ...props }),
  bookCode, 
});

const documents = [
  document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 28 }),
  document({ bookCode: 'mrk', bookName: 'Mark', chapterCount: 16 }),
  document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 24 }),
  document({ bookCode: 'jhn', bookName: 'John', chapterCount: 21 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 5 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1 }),
];

const verbose = false;

function Component () {
  const [startImport, setStartImport] = useState(false);
  const _documents = startImport ? documents : [];

  const proskommaHook = useProskomma({
    verbose,
  });
  
  const importHook = useImport({
    ...proskommaHook,
    documents: _documents,
    verbose,
  });

  const catalogHook = useCatalog({
    ...proskommaHook,
    cv: !importHook.importing,
    verbose,
  });

  return (
    <>
      <button style={{margin: '1em'}} onClick={() => {setStartImport(true);}}>Import</button>
      <h3>catalogHook</h3>
      <p>
        Tip... the raw output of the data for cv is intricate and takes a long time to render in ReactJson, so it is collapsed. Keep this in mind when rendering components based off of this information during an import. This demo is fast because the query is fast and not printed to screen until the user expands it.
      </p>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={catalogHook}
        theme='monokai'
        collapsed='3'
      />
      <h3>`catalog` attribute</h3>
      <p>
        This is a filtered version of the data attribute and should be easier to work with.
      </p>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={catalogHook.catalog}
        theme='monokai'
        collapsed='5'
      />
      <h3>`data` attribute</h3>
      <p>
        This is a raw data from the catalog query that is more verbose and complex to work with.
      </p>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={catalogHook.data}
        theme='monokai'
        collapsed='5'
      />
    </>
  );
};

<Component />
```
