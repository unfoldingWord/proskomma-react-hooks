# usePassage

```js
import { useState } from 'react';
import { useProskomma, useImport, useCatalog, usePassage } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({bookCode, bookName, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, rangeChance: 0, ...props }),
  bookCode, 
});

const documents = [
  document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: 'mrk', bookName: 'Mark', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: 'jhn', bookName: 'John', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1, verseMin: 10 }),
];

const verbose = false;
const reference = '3JN 1:1-2'; // { bookCode: '3JN', chapter: 1, verse: 1 };


function Component () {
  const [startImport, setStartImport] = useState(false);
  const [startQuery, setStartQuery] = useState(false);
  const _documents = startImport ? documents : [];
  const _reference = startQuery ? reference : '';

  const proskommaHook = useProskomma({ verbose });

  const importHook = useImport({
    ...proskommaHook,
    documents: _documents,
    verbose,
  });

  const { data, ...catalogHook } = useCatalog({
    ...proskommaHook,
    verbose,
  });

  const passageHook = usePassage({
    ...proskommaHook,
    reference: _reference,
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
      <h3>passageHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={passageHook}
        theme="monokai"
      />
    </>
  );
};

<Component />
```
