```js
import { useProskomma, useSearch, usePassageFilter } from 'proskomma-react-hooks';
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

const searchText = 'vérité';

function Component () {
  const {
    stateId,
    proskomma,
    documents,
    errors: proskommaErrors,
  } = useProskomma({
    documents: _documents,
    serialize: false,
    verbose: true,
  });

  const {
    stateId: searchStateId,
    data, 
    errors: searchErrors, 
  } = useSearch({
    proskomma,
    stateId,
    text: searchText,
  });

  const {
    stateId: passageFilterStateId,
    passages,
    errors: passageFilterErrors,
  } = usePassageFilter({
    data,
    stateId: searchStateId,
  });

  const json = {
    stateId,
    searchStateId,
    passageFilterStateId,
    documents,
    searchText,
    passages,
    proskommaErrors,
    searchErrors,
    passageFilterErrors,
  };

  return (
    <ReactJson
      style={{ maxHeight: '500px', overflow: 'scroll' }}
      src={json}
      theme="monokai"
    />
  );
};

<Component />
```