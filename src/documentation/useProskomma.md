```js
import { useProskomma } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';

const verbose = true;

function Component() {
  const {
    stateId,
    newStateId,
    errors,
    proskomma,
  } = useProskomma({
    verbose,
  });

  const json = {
    stateId,
    errors,
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