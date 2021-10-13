# Architecture

The architecture of `proskomma-react-hooks` is broken down into three primary layers but all provided through React Custom Hooks.

- Design Principles
  - Do one thing well
  - Minimize state management and caching
  - Separation of concerns

- Provided Hooks
  - Simple Bootstrapping
  - Simple Query Interface
  - Simple Common Queries

# Design principles

## Do one thing well

Each custom hook does one action and returns the response of that action. No nested actions should be exposed except via options in the input props.

## Minimize state management and caching

State management and caching can be a pain and require excessive maintenance and debugging. To reduce thse issues this library should not cache and attempt to manage state only when required.

When props come into a custom hook they must directly result in updates to the response. If actions are async, it may require a stateful hook to group together appropriate data together and return when complete.

## Separation of concerns

- src
  - hooks
  - helpers
  - documentation

### Hooks
`/src/hooks`

Hooks are the primary exposed endpoints for use are the hooks provided. Each hook should only include props, minimal state, lifecycle management, and shaping response. Any business logic such as parsing should be abstracted and imported from helpers.

### Helpers
`/src/helpers`

Helpers are the catchall for parsing and all business logic. Other projects may use `lib` or `core`.

### Documentation
`/src/documentation`

Documentation includes .MD documented examples and wrapper JSX files to enable Styleguidist to function.


# Provided Hooks

## Simple Bootstrapping
`useProskomma`

Proskomma is a powerful scripture runtime engine that can be complex to setup. The goal of this custom hook is to provide minimal interface while being scalable for as many use cases as possible.

Changes to the Proskomma internal data can be difficult to track, providing and returning a random string via `stateId` that changes each time the data changes exposes when queries may need to be run again via React lifecycle hooks such as `useEffect`.

Response from this hook includes 

## Simple Query Interface
`useQuery`

Proskomma provides a GraphQL query interface that is asychronous and is wrapped with a custom hook that needs a proskomma instance, a query, and an optional response filter.

## Simple Common Query Hooks

Queries can be tedious to construct, parse, and maintain. Instead of expecting each consuming project to copy and paste common queries and parsers, this project provides custom hooks that can be used very easily. Bug fixes and improvements to these hooks simplify and minimize long term maintenance across projects.

Custom Query Hooks tightly couple the query generation and the result parsing.

