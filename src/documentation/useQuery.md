```js
import useProskomma from '../hooks/useProskomma';
import useQuery from '../hooks/useQuery';
import ReactJson from 'react-json-view';

const usfm = `
\\id 3JN
\\ide UTF-8
\\h 3 Jean
\\toc1 3 Jean
\\mt 3 Jean

\\s5
\\c 1
\\p 
\\v 1 L'ancien au bien-aimé Gaius, que j'aime dans la vérité.
\\v 2 Bien-aimé, je prie que tu pospères en toutes choses et sois en santé, juste comme prospère ton âme.
`;

const _documents = [
  {
    selectors: {
      org: 'unfoldingWord',
      lang: 'fr',
      abbr: 'ulb',
    },
    bookId: '3jn',
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

function Component () {
  const {
    stateId, proskomma, documents, errors: proskommaErrors,
  } = useProskomma({
    documents: _documents, serialize: false, verbose: true,
  });

  const {
    stateId: queryStateId, query: queryRun, data, errors: queryErrors, 
  } = useQuery({
    proskomma, stateId, query,
  });

  console.log(data);

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