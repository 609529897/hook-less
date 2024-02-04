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

function Reducer<R extends React.ReducerWithoutAction<any>, I>(props: {
  reducer: R;
  initializerArg: I;
  initializer: (arg: I) => React.ReducerStateWithoutAction<R>;
  children: (
    state: [React.ReducerStateWithoutAction<R>, React.DispatchWithoutAction]
  ) => JSX.Element;
}): JSX.Element;

function Reducer<R extends React.ReducerWithoutAction<any>>(props: {
  reducer: R;
  initializerArg: React.ReducerStateWithoutAction<R>;
  initializer?: undefined;
  children: (
    state: [React.ReducerStateWithoutAction<R>, React.DispatchWithoutAction]
  ) => JSX.Element;
}): JSX.Element;

function Reducer<R extends React.Reducer<any, any>, I>(props: {
  reducer: R;
  initializerArg: I & React.ReducerState<R>;
  initializer: (arg: I & React.ReducerState<R>) => React.ReducerState<R>;
  children: (
    state: [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>]
  ) => JSX.Element;
}): JSX.Element;

function Reducer<R extends React.Reducer<any, any>, I>(props: {
  reducer: R;
  initializerArg: I;
  initializer: (arg: I) => React.ReducerState<R>;
  children: (
    state: [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>]
  ) => JSX.Element;
}): JSX.Element;

function Reducer<R extends React.Reducer<any, any>>(props: {
  reducer: R;
  initializerArg: React.ReducerState<R>;
  initializer?: undefined;
  children: (
    state: [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>]
  ) => JSX.Element;
}): JSX.Element;

function Reducer(props: any) {
  const { children, reducer, initializerArg, initializer } = props;
  const state = React.useReducer(reducer, initializerArg, initializer);
  return <>{children(state)}</>;
}

function Ref<T>(props: {
  initialValue: T;
  children: (ref: React.MutableRefObject<T>) => JSX.Element;
}): JSX.Element;
function Ref<T>(props: {
  initialValue: T | null;
  children: (ref: React.RefObject<T>) => JSX.Element;
}): JSX.Element;
function Ref<T = undefined>(props: {
  children: (ref: React.MutableRefObject<T | undefined>) => JSX.Element;
}): JSX.Element;
function Ref(props: any): JSX.Element {
  const { children, initialValue } = props;
  const ref = React.useRef(initialValue);
  return <>{children(ref)}</>;
}
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

export { Context, State, Reducer, Ref, LayoutEffect, Effect, Callback, Memo };
