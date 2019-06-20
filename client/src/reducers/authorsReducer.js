import {
  FETCH_AUTHORS
} from "../actions/authors";

export default function authors(state = [], action = {}){
  switch (action.type){
    case FETCH_AUTHORS:
      return action.data;
    default:
      return state;
  }
}