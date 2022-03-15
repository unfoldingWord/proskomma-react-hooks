# useProskomma

```js
import { useProskomma } from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';

const verbose = false;

function Component() {
  const proskommaHook = useProskomma({ verbose });

  return (
    <ReactJson
      style={{ maxHeight: '500px', overflow: 'scroll' }}
      src={proskommaHook}
      theme="monokai"
    />
  );
};

<Component />
```
