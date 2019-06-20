import {
  FETCH_ARTICLES,
  FETCH_ARTICLE
} from "../actions/articles";

export default function articles(state = {all: [], selected: {}}, action = {}){
  switch (action.type){
    case FETCH_ARTICLE:
      return {
        ...state,
        selected: action.data
      }
    case FETCH_ARTICLES:
      return {
        ...state,
        all: action.data
      }
    default:
      return state;
  }
}