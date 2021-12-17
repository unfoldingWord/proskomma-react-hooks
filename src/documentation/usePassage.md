# usePassage

```js
import { useProskomma, useImport, usePassage } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({bookCode, bookName}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName }),
  bookCode, 
});

const documents = [
  // document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 1 }),
  // document({ bookCode: 'mar', bookName: 'Mark', chapterCount: 1 }),
  // document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 1 }),
  // document({ bookCode: 'jhn', bookName: 'John', chapterCount: 1 }),
  // document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 1 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1 }),
];

const verbose = false;

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
    proskomma, stateId, reference, verbose,
  });

  const json = {
    stateId,
    passageStateId,
    // documents,
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
