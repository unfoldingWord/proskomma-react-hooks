# useSearchForBookCodes

```js
import { useState } from 'react';
import { useProskomma, useImport, useCatalog, useSearchForBookCodes } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({bookCode, bookName, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, ...props }),
  bookCode, 
});

const documents = [
  document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 1 }),
  document({ bookCode: 'mar', bookName: 'Mark', chapterCount: 1 }),
  document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 1 }),
  document({ bookCode: 'jhn', bookName: 'John', chapterCount: 1 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 1 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1 }),
];

const docSetId = `unfoldingWord/lat_lor`;
const searchText = 'adipisicing excepteur fugiat';

const verbose = false;

function Component () {
  const [startImport, setStartImport] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const _documents = startImport ? documents : [];
  const _docSetId = startSearch ? docSetId : '';

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
    bookCodes,
    errors: searchErrors, 
    data,
  } = useSearchForBookCodes({
    proskomma,
    stateId,
    text: searchText,
    docSetId: _docSetId,
    verbose,
  });

  const json = {
    stateId,
    searchStateId,
    searchText,
    bookCodes,
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
