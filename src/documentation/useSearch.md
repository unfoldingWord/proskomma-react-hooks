# useSearch

```js
import { useProskomma, useImport, useSearch } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({bookCode, bookName}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, paragraphStartChapter: true, }),
  bookCode, 
});

const documents = [
  // document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 28 }),
  // document({ bookCode: 'mrk', bookName: 'Mark', chapterCount: 16 }),
  // document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 24 }),
  // document({ bookCode: 'jhn', bookName: 'John', chapterCount: 21 }),
  // document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 5 }),
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

  const {
    stateId: searchStateId,
    query,
    data,
    passages,
    errors: searchErrors, 
  } = useSearch({
    proskomma,
    stateId,
    text: searchText,
    verbose,
  });

  const json = {
    stateId,
    searchStateId,
    // documents,
    proskommaErrors,
    searchText,
    searchErrors,
    query,
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
