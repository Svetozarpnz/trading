import React, { useContext } from 'react';
import { ContextType, Selector, State } from './types';
import { initialState } from './initialState';

const defaultContext: ContextType<State> = {
  contextSelector: () => {},
  contextDispatch: () => ({})
};

export const Context: React.Context<ContextType<any>> =
  React.createContext(defaultContext);

export const useDispatch = () => {
  return useContext(Context).contextDispatch
};

export const useSelector = <TState, TSelected>(
  selector: Selector<TState, TSelected>
): TSelected => useContext(Context).contextSelector(selector);
