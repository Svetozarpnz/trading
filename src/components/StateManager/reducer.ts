import { Reducer } from './types';
import { PARSE, SET_ANALYTICS } from './actions';

export const reducer: Reducer = (state, action) => {
  switch(action.type) {
    case PARSE.end:
      return {
        ...state,
        broker: {
          ...state.broker,
          isParsing: false,
        }
      };
    case PARSE.start:
      return {
        ...state,
        broker: {
          ...state.broker,
          isParsing: true,
        }
      };

    case PARSE.parse:
      return {
        ...state,
        broker: {
          ...state.broker,
          data: action.value,
        }
      }

    case SET_ANALYTICS:
      return {
        ...state,
        analytics: action.value,
      }

    default:
      return state
  }
};
