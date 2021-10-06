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

const query = `{  docSets {
  documents(        withChars: ["Gaius"]
      allChars:false
    ) {
    id
    bookCode: header(id: "bookCode")
    title: header(id: "toc1")
    mainSequence {
      blocks(
        withChars: ["Gaius"]
        allChars:false
      ) {
        scopeLabels tokens { payload }
      }
    }
  }
  matches: enumRegexIndexesForString (enumType:"wordLike" searchRegex:"(^Gaius$)") { matched }
} }`;

function Component () {
  const {
    changeIndex,
    proskomma,
    documents,
    errors: proskommaErrors,
  } = useProskomma({
    documents: _documents,
    serialize: false,
    verbose: true,
  });

  const {
    changeIndex: lastChange,
    query: lastQuery, 
    data, 
    errors: queryErrors, 
  } = useQuery({
    proskomma,
    changeIndex,
    query,
  });

  console.log(data);

  const json = {
    changeIndex: lastChange,
    documents,
    query: lastQuery,
    data,
    proskommaErrors,
    queryErrors,
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