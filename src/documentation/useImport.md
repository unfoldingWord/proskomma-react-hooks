# useImport

```js
import { useState } from 'react';
import { useProskomma, useImport } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const ipsumDocument = ({bookCode, bookName, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, paragraphStartChapter: true, ...props }),
  bookCode, 
});

const urlDocument = ({ selectors, bookCode, bookName, filename, ...props}) => ({
  selectors,
  bookCode, 
  url: `https://git.door43.org/${selectors.org}/${selectors.lang}_${selectors.abbr}/raw/branch/master/${filename}`,
});

const documents = [
  urlDocument({ bookCode: 'mat', filename: '41-MAT.usfm', selectors: { org: 'unfoldingWord', lang: 'en', abbr: 'ult' } }),
  urlDocument({ bookCode: 'mrk', filename: '42-MRK.usfm', selectors: { org: 'unfoldingWord', lang: 'en', abbr: 'ult' } }),
  urlDocument({ bookCode: 'luk', filename: '43-LUK.usfm', selectors: { org: 'unfoldingWord', lang: 'en', abbr: 'ult' } }),
  urlDocument({ bookCode: 'jhn', filename: '44-JHN.usfm', selectors: { org: 'unfoldingWord', lang: 'en', abbr: 'ult' } }),
  ipsumDocument({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 1, verseMax: 1 }),
  ipsumDocument({ bookCode: 'mrk', bookName: 'Mark', chapterCount: 1, verseMax: 1 }),
  ipsumDocument({ bookCode: 'luk', bookName: 'Luke', chapterCount: 1, verseMax: 1 }),
  ipsumDocument({ bookCode: 'jhn', bookName: 'John', chapterCount: 1, verseMax: 1 }),
];

const verbose = true;

function Component() {
  const [startImport, setStartImport] = useState(false);
  const _documents = startImport ? documents : [];

  const proskommaHook = useProskomma({
    verbose,
  });

  const onImport = (props) => console.log('Imported doc!', props);

  const importHook = useImport({
    ...proskommaHook,
    onImport,
    documents: _documents,
    verbose,
  });

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={importHook}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => {setStartImport(true);}}>Import</button>
    </>
  );
};

<Component />
```
