import * as React from 'react';

interface ContextProps<T> {
  context: React.Context<T>;
  children: (context: T) => JSX.Element;
}
function Context<T>(props: ContextProps<T>) {
  const { context, children } = props;
  const ctx = React.useContext<T>(context);
  return <>{children(ctx)}</>;
}

interface StateProps<S> {
  initialState: S;
  children: (
    state: [S, React.Dispatch<React.SetStateAction<S>>]
  ) => JSX.Element;
}
function State<S = undefined>(props: StateProps<S>): JSX.Element;
function State<S>(props: StateProps<S>) {
  const { initialState, children } = props;
  const state = React.useState<S>(initialState);
  return <>{children(state)}</>;
}

function Reducer() {}
function Ref() {}

interface EffectProps {
  effect: React.EffectCallback;
  deps?: React.DependencyList;
}
function LayoutEffect(props: EffectProps) {
  const { effect, deps } = props;
  React.useLayoutEffect(effect, deps);
  return null;
}
function Effect(props: EffectProps) {
  const { effect, deps } = props;
  React.useEffect(effect, deps);
  return null;
}

// function ImperativeHandle() {}
interface CallbackProps<T> {
  callback: T;
  deps: React.DependencyList;
  children: (callback: T) => JSX.Element;
}

function Callback<T extends Function>(props: CallbackProps<T>) {
  const { children, callback, deps } = props;
  const fun = React.useCallback(callback, deps);
  return <>{children(fun)}</>;
}

interface MemoProps<T> {
  factory: () => T;
  deps: React.DependencyList;
  children: (memo: T) => JSX.Element;
}
function Memo<T>(props: MemoProps<T>) {
  const { children, factory, deps } = props;
  const memo = React.useMemo(factory, deps);
  return <>{children(memo)}</>;
}

// function DebugValue() {}
// function DeferredValue() {}
// function Transition() {}

export { Context, State, LayoutEffect, Effect, Callback, Memo };
