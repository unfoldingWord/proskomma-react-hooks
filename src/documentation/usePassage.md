# usePassage

```js
import { useProskomma, useImport, usePassage } from 'proskomma-react-hooks';
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

  const reference = '3JN 1:1-2'; // { bookCode: '3JN', chapter: 1, verse: 1 };

  const {
    stateId: passageStateId, query, passages, data, errors: passageErrors, 
  } = usePassage({
    proskomma, stateId, reference,
  });

  const json = {
    stateId,
    passageStateId,
    documents,
    query,
    errors: [ ...proskommaErrors, ...passageErrors ],
    passages,
    data,
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
