import * as React from 'react';

interface ContextProps<T> {
  context: React.Context<T>;
  children: (context: T) => React.ReactNode;
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
  ) => React.ReactNode;
}
function State<S = undefined>(props: StateProps<S>): React.ReactNode;
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

function ImperativeHandle() {}
function Callback() {}
function Memo() {}
function DebugValue() {}
function DeferredValue() {}
function Transition() {}

export { Context, State, LayoutEffect, Effect };
