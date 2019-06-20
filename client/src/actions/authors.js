import axios from 'axios';

export const FETCH_AUTHORS = 'FETCH_AUTHORS';

export function fetchAuthors(){
  return async dispatch => {
      const response = await axios.get('/authors');
      dispatch( {
        type: FETCH_AUTHORS,
        data: response.data
      } );
    }
}
