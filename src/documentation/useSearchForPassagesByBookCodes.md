# useSearchForPassagesByBookCodes

```js
import { useState } from "react";
import {
  useProskomma,
  useImport,
  useCatalog,
  useSearchForPassagesByBookCodes
} from "proskomma-react-hooks";
import ReactJson from "react-json-view";
import { loremIpsumBook } from "lorem-ipsum-usfm";

const document = ({ bookCode, bookName, ...props }) => ({
  selectors: { org: "unfoldingWord", lang: "lat", abbr: "lor" },
  data: loremIpsumBook({ bookCode, bookName, paragraphStartChapter: true, ...props }),
  bookCode
});

const documents = [
  document({ bookCode: "mat", bookName: "Matthew", chapterCount: 1, verseMax: 1 }),
  document({ bookCode: 'mrk', bookName: "Mark", chapterCount: 1, verseMax: 1 }),
  document({ bookCode: "luk", bookName: "Luke", chapterCount: 1, verseMax: 1 }),
  document({ bookCode: "jhn", bookName: "John", chapterCount: 1, verseMax: 1 }),
  document({ bookCode: "1jn", bookName: "1 Jean", chapterCount: 1, verseMax: 1 }),
  document({ bookCode: "2jn", bookName: "2 Jean", chapterCount: 1, verseMax: 1 }),
  document({ bookCode: "3jn", bookName: "3 Jean", chapterCount: 10, verseMax: 100 })
];

const docSetId = `unfoldingWord/lat_lor`;
const bookCodes = ["mat", 'mrk', "luk", "jhn", "1jn", "2jn", "3jn"];

const verbose = false;

function Component() {
  const [startImport, setStartImport] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [searchText, setSearchText] = useState("adipisicing excepteur fugiat");
  const _documents = startImport ? documents : [];
  const _bookCodes = startSearch ? bookCodes : [];

  const proskommaHook = useProskomma({ verbose });

  const importHook = useImport({
    ...proskommaHook,
    documents: _documents,
    verbose,
  });

  const { data, ...catalogHook } = useCatalog({
    ...proskommaHook,
    cv: true,
    verbose,
  });

  const searchForPassagesByBookCodesHook = useSearchForPassagesByBookCodes({
    ...proskommaHook,
    text: searchText,
    docSetId,
    bookCodes: _bookCodes,
    blocks: false,
    tokens: false,
    verbose
  });

  return (
    <>
      <input onBlur={(e) => {setSearchText(e.target.value);}} defaultValue={searchText} />
      <button style={{ margin: "1em" }} onClick={()=>{setStartImport(true);}}>Import</button>
      <button style={{ margin: "1em" }} onClick={()=>{setStartSearch(true);}}
      >Search</button>
      <h3>catalogHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={catalogHook}
        theme="monokai"
      />
      <h3>searchForPassagesByBookCodesHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={searchForPassagesByBookCodesHook}
        theme="monokai"
      />
    </>
  );
}

<Component />;
```
