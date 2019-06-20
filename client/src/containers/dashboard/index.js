import React, {Component} from 'react'
import { connect }  from 'react-redux';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import {
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Article from '../../components/article/index';
import Loading from '../../components/loading/index';
import Filters from '../../components/filters/index';

import './styles.css';

/* actions */
import { fetchArticles, deleteArticle } from '../../actions/articles';

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      authors: [],
      loading: true
    };
    this.getArticles = this.getArticles.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.createArticle = this.createArticle.bind(this);
  }

  componentDidMount(){
    this.getArticles();
  }

  render(){
    const {
      articles
    } = this.props;

    const {
      loading
    } = this.state;

    return (
      <div className={'Dashboard'}>
        {loading
          ? <Loading/>
          : <div className={'Dashboard-articles-container'}>
            {articles.length
              ? articles.map(x => <Article key={x._id} article={x} onDelete={this.deleteArticle}/>)
              : <h2>No articles found. Write one!</h2>
            }
          </div>
        }
        <div className={'Dashboard-tool-bar'}>
          <Button size="large" variant="contained" color="primary" onClick={this.createArticle}>
            New Article
            <AddIcon>New Article</AddIcon>
          </Button>
          <Filters onApply={this.getArticles}/>
        </div>
      </div>
    )
  }

  getArticles(title, authors){
    this.setState({
      loading: true,
      title,
      authors
    }, async ()=>{
      await this.props.fetchArticles(title, authors);
      this.setState({loading: false});
    });
  }

  deleteArticle(_id){
    const {
      title,
      authors
    } = this.state;

    this.setState({loading: true}, async ()=>{
      await this.props.deleteArticle(_id);
      this.getArticles(title, authors)
    });
  }

  createArticle(){
    this.props.history.push('/new');
  }
}

Dashboard.propTypes = {
  articles: PropTypes.array.isRequired
}

function mapStateToProps(state){
  return {
    articles: state.articles.all
  }
}

export default connect(mapStateToProps, {fetchArticles, deleteArticle})(withRouter(Dashboard));