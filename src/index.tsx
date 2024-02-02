import * as React from "react";

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

interface EffectProps {
  effect: React.EffectCallback;
  deps?: React.DependencyList;
}
function Effect(props: EffectProps) {
  const { effect, deps } = props;
  React.useEffect(effect, deps);
  return null;
}

export { State, Effect };
