# useSuccinctDocSetLoad

```js
import { useState } from 'react';
import {
  useProskomma, useImport, useCatalog, useSuccinctDocSetSerialize, useSuccinctDocSetLoad,
} from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({bookCode, bookName, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, paragraphStartChapter: true, ...props }),
  bookCode, 
});

const documents = [
  document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 1 }),
  document({ bookCode: 'mrk', bookName: 'Mark', chapterCount: 1 }),
  document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 1 }),
  document({ bookCode: 'jhn', bookName: 'John', chapterCount: 1 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 1 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1 }),
];

const verbose = false;

function Component () {
  const [startImport, setStartImport] = useState(false);
  const [startSerialize, setStartSerialize] = useState(false);
  const [startLoad, setStartLoad] = useState(false);

  const _documents = startImport ? documents : [];
  const _docSetId = startSerialize ? 'unfoldingWord/lat_lor' : undefined;

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

  const succinctDocSetSerializeHook = useSuccinctDocSetSerialize({
    ...proskommaHook,
    docSetId: _docSetId,
    verbose,
  });

  const proskomma2Hook = useProskomma({
    verbose,
  });

  const { data: data2, ...catalog2Hook } = useCatalog({
    ...proskomma2Hook,
    verbose,
  });

  const _succinctDocSet = startLoad ? succinctDocSetSerializeHook.succinctDocSet : undefined;

  const succinctDocSetLoadHook = useSuccinctDocSetLoad({
    ...proskomma2Hook,
    succinctDocSet: _succinctDocSet,
    verbose,
  });

  return (
    <>
      <button style={{margin: '1em'}} onClick={() => {setStartImport(true);}}>Import</button>
      <button style={{margin: '1em'}} onClick={() => {setStartSerialize(true);}}>Serialize</button>
      <button style={{margin: '1em'}} onClick={() => {setStartLoad(true);}}>Load</button>
      <h3>catalogHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={catalogHook}
        theme="monokai"
      />
      <h3>succinctDocSetSerializeHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={succinctDocSetSerializeHook}
        theme="monokai"
      />
      <h3>catalog2Hook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={catalog2Hook}
        theme="monokai"
      />
      <h3>succinctDocSetLoadHook</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={succinctDocSetLoadHook}
        theme="monokai"
      />
    </>
  );
};

<Component />
```
