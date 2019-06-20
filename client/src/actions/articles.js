import axios from 'axios';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLE = 'FETCH_ARTICLE';

export const fetchArticles = (title, authors) => {
  return async dispatch => {
      const response = await axios.get('/articles', {params: {title, authors}});
      dispatch( {
        type: FETCH_ARTICLES,
        data: response.data
      } );
    }
}

export const fetchArticle = (_id) => {
  return async dispatch => {
    const response = await axios.get('/articles/' + _id);
    dispatch( {
      type: FETCH_ARTICLE,
      data: response.data
    } );
  }
}

export const deleteArticle = (_id) => {
  return async () => {
    await axios.delete('/articles/' + _id);
  }
};

export const createArticle = (body) => {
  return async () => {
    await axios.post('/articles', body);
  }
};

export const updateArticle = (_id, body) => {
  return async () => {
    await axios.patch('/articles/' + _id, body);
  }
};