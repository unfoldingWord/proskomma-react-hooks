# useQuery

```js
import { useProskomma, useImport, useQuery, } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';

const usfm = `\\id 3JN
\\ide UTF-8
\\h 3 Jean
\\toc1 Troisième épître de Jean
\\toc2 3 Jean
\\toc3 3jn
\\mt 3 Jean

\\s5
\\c 1
\\p 
\\v 1 L'ancien au bien-aimé Gaius, que j'aime dans la vérité.
\\v 2 Bien-aimé, je prie que tu pospères en toutes choses et sois en santé, juste comme prospère ton âme.`;

const documents = [
  {
    selectors: {
      org: 'unfoldingWord',
      lang: 'fr',
      abbr: 'ulb',
    },
    bookCode: '3jn',
    data: usfm,
  }
];

const query = `{
  processor
  packageVersion
  documents(withBook: "3JN") {
    cv (chapter:"1" verses:["1"]) 
      { text }
  }
}`;

const verbose = true;

function Component () {
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
    documents,
    verbose,
  });

  const {
    stateId: queryStateId, query: queryRun, data, errors: queryErrors, 
  } = useQuery({
    proskomma, stateId, query,
  });

  const json = {
    queryStateId,
    documents,
    query: queryRun,
    data,
    errors: [ ...proskommaErrors, ...queryErrors ],
  };

  return (
    <ReactJson
      style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
      src={json}
      theme="monokai"
    />
  );
};

<Component />
```
