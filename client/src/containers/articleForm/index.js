import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect }  from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Button,
  IconButton,
  TextField
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import Loading from '../../components/loading';
import ModalAuthorsList from '../../components/modalAuthorsList';

import './styles.css';

/* actions */
import { createArticle, fetchArticle, updateArticle } from '../../actions/articles';

class ArticleForm extends Component{
  static defaultProps = {
    isNew: true,
    onDelete: ()=>{}
  };

  constructor(props){
    super(props);
    this.state = {
      title: '',
      short_description: '',
      long_description: '',
      authors: [],
      loading: false,
      showAuthorsList: false,
      error: []
    };
    this.onCancel = this.onCancel.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.toggleAuthorsList = this.toggleAuthorsList.bind(this);
    this.onAuthorsEdited = this.onAuthorsEdited.bind(this);
  }

  componentDidMount(){
    if(!this.props.isNew && this.props.match.params.id){
      this.setState({loading: true}, async ()=>{
        await this.props.fetchArticle(this.props.match.params.id);
        const article = this.props.article;
        this.setState({
          title: article.title,
          short_description: article.short_description,
          long_description: article.long_description,
          authors: article.authors,
          loading: false
        })
      })
    }
  }

  render(){
    const {
      isNew
    } = this.props;

    const {
      title,
      short_description,
      long_description,
      authors,
      loading,
      showAuthorsList,
      error
    } = this.state;

    if(loading){
      return (
        <div className={'ArticleForm'}>
          <Loading/>
        </div>
      );
    }

    return (
      <div className={'ArticleForm'}>
        <div className={'ArticleForm-container'}>
          <h1>{isNew ? 'NEW ARTICLE' : 'EDIT ARTICLE'}</h1>
          <div>
            <div className={'ArticleForm-authors-box'}>
              <div className={'ArticleForm-authors-box-title'}>
                <h4>Authors</h4>
                <IconButton aria-label='Edit' onClick={this.toggleAuthorsList}>
                  <EditIcon />
                </IconButton>
              </div>
              {authors.map( a => a.name ).join(' | ')}
            </div>
            <TextField
              id='title'
              label='Title'
              value={title}
              onChange={this.onInputChange}
              placeholder='Type a title for the article'
              fullWidth
              margin='normal'
              variant='filled'
              InputLabelProps={{
                shrink: true,
              }}
              error = {error.hasOwnProperty('title')}
            />
            <TextField
              id='short_description'
              label='Short description'
              value={short_description}
              onChange={this.onInputChange}
              multiline
              placeholder='Type a short description for the article'
              fullWidth
              margin='normal'
              variant='filled'
              InputLabelProps={{
                shrink: true,
              }}
              error = {error.hasOwnProperty('short_description')}
            />
            <TextField
              id='long_description'
              label='Long description'
              value={long_description}
              onChange={this.onInputChange}
              multiline
              placeholder="Type the article's body"
              fullWidth
              margin='normal'
              variant='filled'
              InputLabelProps={{
                shrink: true,
              }}
              error = {error.hasOwnProperty('long_description')}
            />
          </div>
        </div>
        <div className={'ArticleForm-tool-bar'}>
          <Button size='large' variant='contained' color='primary' onClick={this.onSave}>
            Save
          </Button>
          <Button size='large' variant='contained' color='secondary' onClick={this.onCancel}>
            Cancel
          </Button>
        </div>

        <ModalAuthorsList
          show={showAuthorsList}
          authorsSelected={authors}
          onClose={this.toggleAuthorsList}
          onAccept={this.onAuthorsEdited}
        />

      </div>
    )
  }

  onInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });

    this.removeError(e.target.id);
  }

  onCancel(){
    this.props.history.push('/');
  }

  onSave(){
    const {
      title,
      short_description,
      long_description,
      authors
    } = this.state;

    const {
      isNew,
      createArticle,
      updateArticle
    } = this.props;

    const error = {};

    //client validation
    const validate = key => {
      if( !this.state[key] || this.state[key].trim().length===0 ){
        error[key] = true
      }
    };

    //validation
    validate('title');
    validate('short_description');
    validate('long_description');

    if( Object.keys(error).length > 0 ) {
      this.setState({error});
    } else {
      this.setState({
        loading: true
      }, async ()=>{
        const body = {
          title,
          short_description,
          long_description,
          authors: authors.map(x => x._id)
        }

        if(isNew){
          await createArticle(body);
        } else {
          await updateArticle(this.props.match.params.id, body);
        }

        this.onCancel();
      });
    }
  }

  toggleAuthorsList(){
    this.setState(prevState =>{
      return {showAuthorsList: !prevState.showAuthorsList}
    });
  }

  onAuthorsEdited(authors){
    this.setState({authors: [...authors]});
  }

  removeError(key){
    const {
      error
    } = this.state;

    delete error[key];

    this.setState({
      error: Object.assign({}, error)
    });
  }
}


ArticleForm.propTypes = {
  article: PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
    article: state.articles.selected
  }
}

export default connect(mapStateToProps, {createArticle, fetchArticle, updateArticle})(withRouter(ArticleForm));