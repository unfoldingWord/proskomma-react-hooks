```js
import { useProskomma } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';

const data = `
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
    bookId: 'tit',
    data,
  }
];

function Component() {
  const {
    stateId,
    documents,
    errors,
    proskomma,
  } = useProskomma({
    documents: _documents,
    serialize: false,
    verbose: true,
  });

  const json = {
    stateId,
    documents,
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