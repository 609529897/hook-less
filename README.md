# hook-less

**Warning: This package has not been written for testing, so please be careful when using it in a production environment.**

## Install

```sh
yarn add hook-less
```

or

```sh
npm install hook-less
```

## APIs

### `State`

```tsx
import { State } from 'hook-less';

function Component(props) {
  return (
    <State initialState={1}>
      {([state, setState]) => {
        return (
          <button onClick={() => setState(pre => pre + 1)}>{state}</button>
        );
      }}
    </State>
  );
}
```

### `Reducer`

```tsx
import { Reducer } from 'hook-less';

interface State {
  count: number;
}

interface Action {
  type: 'inc';
}

const reducer = (state: State, action: Action) => {
  if (action.type === 'inc') {
    return {
      ...state,
      count: state.count + 1,
    };
  }

  return state;
};

function Component(props) {
  return (
    <Reducer reducer={reducer} initializerArg={{ count: 1 }}>
      {([state, dispatch]) => {
        return (
          <button onClick={() => dispatch({ type: 'inc' })}>
            {state.count}
          </button>
        );
      }}
    </Reducer>
  );
}
```

### `Effect`

```tsx
import { State, Effect } from 'hook-less';

function Component(props) {
  return (
    <State initialState={1}>
      {([state, setState]) => {
        return (
          <button onClick={() => setState(pre => pre + 1)}>
            <Effect
              deps={[state]}
              effect={() => {
                state > 10 && console.log(state);
              }}
            />
            {state}
          </button>
        );
      }}
    </State>
  );
}
```

### `LayoutEffect`

```tsx
import { State, Effect } from 'hook-less';

function Component(props) {
  return (
    <State initialState={1}>
      {([state, setState]) => {
        return (
          <button onClick={() => setState(pre => pre + 1)}>
            <LayoutEffect
              deps={[state]}
              effect={() => {
                state > 10 && console.log(state);
              }}
            />
            {state}
          </button>
        );
      }}
    </State>
  );
}
```

### `Context`

```tsx
import { Context } from 'hook-less';
import { createContext } from 'react';

const ctx = createContext({ count: 1 });

function Component(props) {
  return (
    <Context context={ctx}>
      {ctx => {
        return <span>{ctx.count}</span>;
      }}
    </Context>
  );
}
```

### `Ref`

```tsx
import { Ref } from 'hook-less';

function Component(props) {
  return (
    <Ref initialValue={0}>
      {ref => {
        return <button onClick={() => (ref.current = 1)}>click</button>;
      }}
    </Ref>
  );
}
```

### `Memo`

```tsx
import { Memo } from 'hook-less';

function Component(props) {
  return (
    <Memo factory={() => 1} deps={[]}>
      {state => {
        return <span>{state}</span>;
      }}
    </Memo>
  );
}
```

### `Callback`

```tsx
import { Callback } from 'hook-less';

function Component(props) {
  return (
    <Callback callback={() => 1 + 1} deps={[]}>
      {inc => {
        return <button onClick={inc}>click</button>;
      }}
    </Callback>
  );
}
```

### custom hook

before:

```tsx
const toggleReducer = (state: boolean, nextValue?: any) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

const useToggle = (
  initialValue: boolean
): [boolean, (nextValue?: any) => void] => {
  return useReducer<Reducer<boolean, any>>(toggleReducer, initialValue);
};
```

after:

```tsx
const toggleReducer = (state: boolean, nextValue?: any) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

const Toggle = ({ initialValue, children }) => {
  return (
    <Reducer reducer={toggleReducer} initializerArg={initialValue}>
      {children}
    </Reducer>
  );
};
```

## License

MIT
