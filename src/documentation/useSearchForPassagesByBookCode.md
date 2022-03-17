# useSearchForPassagesByBookCode

```js
import { useState } from 'react';
import { useProskomma, useImport, useCatalog, useSearchForPassagesByBookCode } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

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

const docSetId = `unfoldingWord/lat_lor`;
const bookCode = 'jhn';
const _searchText = 'adipisicing excepteur fugiat';

const verbose = false;

function Component () {
  const [startImport, setStartImport] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [searchText, setSearchText] = useState(_searchText);
  const _documents = startImport ? documents : [];
  const _bookCode = startSearch ? bookCode : '';

  const proskommaHook = useProskomma({ verbose });

  const importHook = useImport({
    ...proskommaHook,
    documents: _documents,
    verbose,
  });

  const { data, ...catalogHook } = useCatalog({
    ...proskommaHook,
    cv: false,
    verbose,
  });

  const searchForPassagesByBookCodeHook = useSearchForPassagesByBookCode({
    ...proskommaHook,
    text: searchText,
    docSetId,
    bookCode: _bookCode,
    blocks: false,
    tokens: false,
    verbose,
  });

  return (
    <>
      <input onBlur={(e) => { setSearchText(e.target.value); }} defaultValue={searchText} />
      <button style={{margin: '1em'}} onClick={() => {setStartImport(true);}}>Import</button>
      <button style={{margin: '1em'}} onClick={() => {setStartSearch(true);}}>Search</button>
      <h3>catalogHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={catalogHook}
        theme="monokai"
      />
      <h3>searchForPassagesByBookCodeHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={searchForPassagesByBookCodeHook}
        theme="monokai"
      />
    </>
  );
};

<Component />
```
