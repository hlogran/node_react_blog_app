import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import authorsReducer from './authorsReducer';

export default combineReducers({
  articles: articlesReducer,
  authors: authorsReducer
});
