# useSearchForPassagesByBookCodes

```js
import { useProskomma, useImport, useSearchForPassagesByBookCodes } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({bookCode, bookName}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName }),
  bookCode, 
});

const documents = [
  // document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 28 }),
  // document({ bookCode: 'mar', bookName: 'Mark', chapterCount: 16 }),
  // document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 24 }),
  // document({ bookCode: 'jhn', bookName: 'John', chapterCount: 21 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 5 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1 }),
];

const docSetId = `unfoldingWord/lat_lor`;
const bookCodes = [
  // 'mat',
  // 'mar',
  // 'luk',
  // 'jhn',
  '1jn',
  '2jn',
  '3jn'
];
const searchText = 'adipisicing excepteur fugiat velit';

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
    blocks: false,
    tokens: false,
    verbose,
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
