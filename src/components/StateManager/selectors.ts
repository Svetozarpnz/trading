import { State } from './types';

export const getBrokerDataSelector = (state: State) => state.broker.data;
export const getAnalyticsSelector = (state: State) => state.analytics;
