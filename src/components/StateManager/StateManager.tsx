import React, { FC, useReducer } from 'react';
import { reducer } from './reducer';
import { Props, Reducer, Selector, State } from './types';
import { initialState } from './initialState';
import { Context } from './Context';

const StateManager: FC<Props> = ({
  children
}) => {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

  const useSelectorHook = (fn: Selector<State, any>) => fn(state);

  return (
    <Context.Provider
      value={{
        contextSelector: useSelectorHook,
        contextDispatch: dispatch,
      }}
    >
      {children}
    </Context.Provider>
  )
};

export default StateManager;
