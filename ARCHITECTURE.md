# Architecture

The architecture of `proskomma-react-hooks` is broken down into three primary layers but all provided through React Custom Hooks.

- Design Principles
  - Do one thing well
  - Minimize state management and caching
  - Separation of concerns

- Provided Hooks
  - Simple Bootstrapping
  - Simple Importing
  - Simple Query Interface
  - Simple Common Queries

## Design Principles

### Do one thing well

Each custom hook does one action and returns the response of that action. No nested actions should be exposed except via options in the input props.

### Minimize state management and caching

State management and caching can be a pain and require excessive maintenance and debugging. To reduce thse issues this library should not cache and attempt to manage state only when required.

When props come into a custom hook they must directly result in updates to the response. If actions are async, it may require a stateful hook to group together appropriate data together and return when complete.

### Separation of concerns

- src
  - hooks
  - helpers
  - documentation

#### Hooks `/src/hooks`

Hooks are the primary exposed endpoints for use are the hooks provided. Each hook should only include props, minimal state, lifecycle management, and shaping response. Any business logic such as parsing should be abstracted and imported from helpers.

#### Helpers `/src/helpers`

Helpers are the catchall for parsing and all business logic. Other projects may use `lib` or `core`.

#### Documentation `/src/documentation`

Documentation includes .MD documented examples and wrapper JSX files to enable Styleguidist to function.

## Provided Hooks

- `useProskomma`
- `useImport`
- `useQuery`
- `useCatalog`
- `useSearchForPassages`

### Simple Bootstrapping `useProskomma`

Proskomma is a powerful scripture runtime engine that can be complex to setup. The goal of this custom hook is to provide minimal interface while being scalable for as many use cases as possible.

Changes to the Proskomma internal data can be difficult to track, providing and returning a random string via `stateId` that changes each time the data changes exposes when queries may need to be run again via React lifecycle hooks such as `useEffect`.

Response from this hook includes
useProskomma can have optional serialized data passed into it for resuming state, and allow that to be the only prop instead of documents. It's returned "state" is the Proskomma instance, stateId for changes, and onStateChange() for a trigger to later update stateId. Although Proskomma instance is not stored in state but just passed as if it was merged with the current state.

### Simple Importing `useImport`

useImport is a custom hook that new documents are passed into as props. The other prop would be the Proskomma instance passed from the useProskomma response. With each import it would trigger onStateChange() from useProskomma that would mutate the stateId as needed.

### Simple Query Interface `useQuery`

Proskomma provides a GraphQL query interface that is asychronous and is wrapped with a custom hook that needs a proskomma instance, a query, and an optional response filter.

It can run queries on pk before new documents are imported.

### Simple Common Query Hooks

Queries can be tedious to construct, parse, and maintain. Instead of expecting each consuming project to copy and paste common queries and parsers, this project provides custom hooks that can be used very easily. Bug fixes and improvements to these hooks simplify and minimize long term maintenance across projects.

Custom Query Hooks tightly couple the query generation and the result parsing.

### Simple Status `useCatalog`

`useCatalog` is a custom hook that wraps useQuery that runs the query to return what documents are loaded.
The goal is to decouple react state management from duplicating and storing the documents content after import as well as allow each hook to do only one thing.

### Simple Searching `useSearchForPassages`

`useSearchForPassages` is a custom hook that wraps many other nested hooks to handle proper lifecycle management for all the complexity of fetching the bookCodes that include those terms, building a queue of each bookCode to search in and returning a growing array as new results are found in dequeued bookCodes.

Each nested custom hook that `useSearchForPassages` uses does one thing and manages one state change.
