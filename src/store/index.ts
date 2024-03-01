import { createStore } from 'redux';
import {reducer} from './reducer'; // импортируйте корневой редюсер

const store = createStore(reducer);

export default store;