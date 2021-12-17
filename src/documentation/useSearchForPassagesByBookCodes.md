# useSearchForPassagesByBookCodes

```js
import { useState } from 'react';
import { useProskomma, useImport, useCatalog, useSearchForPassagesByBookCodes } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({bookCode, bookName, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, ...props }),
  bookCode, 
});

const documents = [
  document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 28 }),
  document({ bookCode: 'mar', bookName: 'Mark', chapterCount: 16 }),
  document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 24 }),
  document({ bookCode: 'jhn', bookName: 'John', chapterCount: 21 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 5 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1 }),
];

const docSetId = `unfoldingWord/lat_lor`;
const bookCodes = [
  'mat',
  'mar',
  'luk',
  'jhn',
  '1jn',
  '2jn',
  '3jn'
];
const searchText = 'adipisicing excepteur fugiat';

const verbose = false;

function Component () {
  const [startImport, setStartImport] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const _documents = startImport ? documents : [];
  const _bookCodes = startSearch ? bookCodes : [];

  const {
    stateId,
    newStateId,
    proskomma,
    errors: proskommaErrors,
  } = useProskomma({
    verbose,
  });

  const {
    errors: importErrors,
  } = useImport({
    proskomma,
    stateId,
    newStateId,
    documents: _documents,
    verbose,
  });

  const {
    stateId: catalogStateId,
    catalog,
    errors: catalogErrors, 
  } = useCatalog({
    proskomma,
    stateId,
    verbose,
  });

  const {
    stateId: searchStateId,
    query,
    passages,
    errors: searchErrors, 
    data,
  } = useSearchForPassagesByBookCodes({
    proskomma,
    stateId,
    text: searchText,
    docSetId,
    bookCodes: _bookCodes,
    blocks: false,
    tokens: false,
    verbose,
  });

  const json = {
    stateId,
    searchStateId,
    searchText,
    passages,
    catalog,
    query,
    proskommaErrors,
    searchErrors,
    // documents,
    data,
  };

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={json}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => {setStartImport(true);}}>Import</button>
      <button style={{margin: '1em'}} onClick={() => {setStartSearch(true);}}>Search</button>
    </>
  );
};

<Component />
```
