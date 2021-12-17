# useQuery

```js
import { useState } from 'react';
import { useProskomma, useImport, useCatalog, useQuery, } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({bookCode, bookName, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, ...props}),
  bookCode, 
});

const documents = [
  document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 28 }),
  document({ bookCode: 'mar', bookName: 'Mark', chapterCount: 16 }),
  document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 24 }),
  document({ bookCode: 'jhn', bookName: 'John', chapterCount: 21 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 5 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1, verseMin: 10 }),
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
    stateId: queryStateId, query: queryRun, data, errors: queryErrors, 
  } = useQuery({
    proskomma,
    stateId,
    query: _query,
    verbose,
  });

  const json = {
    queryStateId,
    // documents,
    data,
    catalog,
    query: queryRun,
    errors: [ ...proskommaErrors, ...queryErrors ],
  };

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={json}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => {setStartImport(true);}}>Import</button>
      <button style={{margin: '1em'}} onClick={() => {setStartQuery(true);}}>Query</button>
    </>
  );
};

<Component />
```
