# useSuccinctDocSetSerialize

```js
import { useState } from 'react';
import { useProskomma, useImport, useCatalog, useSuccinctDocSetSerialize } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({bookCode, bookName, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, ...props }),
  bookCode, 
});

const documents = [
  document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: 'mrk', bookName: 'Mark', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: 'jhn', bookName: 'John', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1, verseMax: 1 }),
];

const verbose = false;

function Component () {
  const [startImport, setStartImport] = useState(false);
  const [startSerialize, setStartSerialize] = useState(false);

  const _documents = startImport ? documents : [];
  const _docSetId = startSerialize ? 'unfoldingWord/lat_lor' : undefined;

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
    stateId: serializeStateId,
    errors: serializeErrors,
    succinctDocSet,
  } = useSuccinctDocSetSerialize({
    proskomma,
    stateId,
    docSetId: _docSetId,
    verbose,
  });

  const json = {
    stateId,
    serializeStateId,
    serializeErrors,
    succinctDocSet,
    catalogStateId,
    catalog,
    proskommaErrors,
    catalogErrors,
    // documents,
  };

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={json}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => {setStartImport(true);}}>Import</button>
      <button style={{margin: '1em'}} onClick={() => {setStartSerialize(true);}}>Serialize</button>
    </>
  );
};

<Component />
```
