# useQuery

```js
import { useState } from 'react';
import { useProskomma, useImport, useCatalog, useQuery, } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({bookCode, bookName, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, paragraphStartChapter: true, ...props}),
  bookCode, 
});

const documents = [
  document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 28 }),
  document({ bookCode: 'mrk', bookName: 'Mark', chapterCount: 16 }),
  document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 24 }),
  document({ bookCode: 'jhn', bookName: 'John', chapterCount: 21 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 5 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1, verseMin: 10, rangeChance: 0 }),
];

const verbose = false;

const query = `{
  processor
  packageVersion
  documents(withBook: "3JN") {
    cv (chapter:"1" verses:["1"]) 
      { text }
  }
}`;

function Component () {
  const [startImport, setStartImport] = useState(false);
  const [startQuery, setStartQuery] = useState(false);
  const _documents = startImport ? documents : [];
  const _query = startQuery ? query : '';

  const proskommaHook = useProskomma({ verbose });

  const importHook = useImport({
    ...proskommaHook,
    documents: _documents,
    verbose,
  });

  const { data, ...catalogHook } = useCatalog({
    ...proskommaHook,
    cv: true,
    verbose,
  });

  const queryHook = useQuery({
    ...proskommaHook,
    query: _query,
    verbose,
  });

  return (
    <>
      <button style={{margin: '1em'}} onClick={() => {setStartImport(true);}}>Import</button>
      <button style={{margin: '1em'}} onClick={() => {setStartQuery(true);}}>Query</button>
      <h3>catalogHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={catalogHook}
        theme="monokai"
      />
      <h3>queryHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={queryHook}
        theme="monokai"
      />
    </>
  );
};

<Component />
```
