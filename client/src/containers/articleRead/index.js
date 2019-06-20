import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect }  from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

import Loading from '../../components/loading';

import './styles.css';

/* actions */
import { fetchArticle } from '../../actions/articles';

class ArticleRead extends Component{

  constructor(props){
    super(props);
    this.state = {
      title: '',
      short_description: '',
      long_description: '',
      authors: [],
      loading: false,
    };
    this.onGoBack = this.onGoBack.bind(this);
  }

  componentDidMount(){
    if(this.props.match.params.id){
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
      title,
      short_description,
      long_description,
      authors,
      loading,
    } = this.state;

    if(loading){
      return (
        <div className={'ArticleRead'}>
          <Loading/>
        </div>
      );
    }

    return (
      <div className={'ArticleRead'}>
        <div className={'ArticleRead-container'}>
          <h5>{'Authors: ' + authors.map( a => a.name ).join(' | ')}</h5>
          <h1>{title}</h1>
          <h3>{short_description}</h3>
          <p>{long_description}</p>
        </div>

        <div className={'ArticleRead-tool-bar'}>
          <Button size='large' variant='contained' color='primary' onClick={this.onGoBack}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  onGoBack(){
    this.props.history.push('/');
  }
}


ArticleRead.propTypes = {
  article: PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
    article: state.articles.selected
  }
}

export default connect(mapStateToProps, {fetchArticle})(withRouter(ArticleRead));