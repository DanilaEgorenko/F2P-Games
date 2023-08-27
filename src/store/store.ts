import { createStore } from 'redux';
import { reducerFiltersAndSort } from './reducers';

const store = createStore(reducerFiltersAndSort);

export default store;