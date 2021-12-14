# useSearchForPassagesByBookCodes

```js
import { useProskomma, useImport, useSearchForPassagesByBookCodes } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';

const usfm = ({bookCode, bookName}) => (`\\id ${bookCode.toUpperCase()}
\\ide UTF-8
\\h ${bookName}
\\toc1 épître de Jean
\\toc2 ${bookName}
\\toc3 ${bookCode}
\\mt ${bookName}

\\s5
\\c 1
\\p 
\\v 1 L'ancien au bien-aimé Gaius, que j'aime dans la vérité.
\\v 2 Bien-aimé, je prie que tu pospères en toutes choses et sois en santé, juste comme prospère ton âme.`);

const document = ({bookCode, bookName}) => ({
  selectors: { org: 'unfoldingWord', lang: 'fr', abbr: 'ulb' }, 
  data: usfm({ bookCode, bookName }),
  bookCode, 
});

const documents = [
  document({ bookCode: '1jn', bookName: '1 Jean' }),
  document({ bookCode: '2jn', bookName: '2 Jean' }),
  document({ bookCode: '3jn', bookName: '3 Jean' }),
];

const docSetId = `unfoldingWord/fr_ulb`;
const bookCodes = ['1jn', '2jn', '3jn', '4jn'];
const searchText = 'vérité';

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
    bookCodes,
    blocks: true,
    tokens: true,
  });

  const json = {
    stateId,
    searchStateId,
    proskommaErrors,
    searchText,
    query,
    passages,
    searchErrors,
    // documents,
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
