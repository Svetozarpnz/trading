import { State } from './types';

export const initialState: State = {
  broker: {
    data: null,
    isParsing: false,
  },
  analytics: []
};
