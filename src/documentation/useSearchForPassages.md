# useSearchForPassages

```js
import { useState } from 'react';
import { useProskomma, useImport, useCatalog, useSearchForPassages } from 'proskomma-react-hooks';
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
    passages,
    bookCodes,
    errors: searchErrors, 
  } = useSearchForPassages({
    proskomma,
    stateId,
    text: searchText,
    docSetId: _docSetId,
    blocks: false,
    tokens: false,
    verbose,
  });

  const json = {
    stateId,
    searchStateId,
    searchText,
    bookCodes,
    passages,
    catalog,
    proskommaErrors,
    importErrors,
    searchErrors,
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
