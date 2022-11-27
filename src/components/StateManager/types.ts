import React from 'react';
import { Deal, Sprout } from '../../common/types';

export type Props = {
  children: React.ReactNode;
}

export type State = {
  broker: {
    data: Deal[] | null;
    isParsing: boolean;
  }
  analytics: {
    name: string;
    sprouts: Sprout[]
  }[]
};

export type Selector<TState, TSelected> = (state: TState) => TSelected;
export type SelectorHook<TState, TSelected> =
  (selector: Selector<TState, TSelected>) => TSelected;

export type ContextType<TState> = {
  contextSelector: SelectorHook<TState, any>,
  contextDispatch: React.Dispatch<Action>
};

export type Action = {
  type: string;
  value: any;
};
export type Reducer = (state: State, action: Action) => State;
