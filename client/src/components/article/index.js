import React, {Component} from 'react'
import Dialog from '../dialog';
import { withRouter } from 'react-router-dom';

import './styles.css';

class Article extends Component{

  static defaultProps = {
    article: {
      id: '1',
      title: '1',
      short_description: 'short_description',
      long_description: 'long_description'
    },
    onDelete: ()=>{}
  };

  constructor(props){
    super(props);
    this.state = {
      showDialog: false
    };
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onRead = this.onRead.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  onDelete(){
    const {
      article,
      onDelete
    } = this.props;

    onDelete(article._id);
    this.toggleDialog();
  }

  onEdit(){
    const {
      article,
      history
    } = this.props;

    history.push('/edit/' + article._id);
  }

  onRead(){
    const {
      article,
      history
    } = this.props;

    history.push('/read/' + article._id);
  }

  toggleDialog(){
    this.setState(prevState =>{
      return {showDialog: !prevState.showDialog}
    });
  }

  render(){
    const {
      title,
      short_description,
      authors
    } = this.props.article;

    const {
      showDialog
    } = this.state

    return (
      <div className={'Article'}>
        <h3>{title}</h3>
        <p>{'Authors: ' + authors.map( a => a.name ).join(' | ')}</p>
        <p>{short_description}</p>
        <div className={'Article-commands-container'}>
          <button onClick={this.onRead}>Read</button>
          |
          <button onClick={this.onEdit}>Edit</button>
          |
          <button onClick={this.toggleDialog}>Delete</button>
        </div>

        <Dialog
          open = {showDialog}
          title = 'Delete article'
          text = 'Are you sure you want to delete this article?'
          onAccept = {this.onDelete}
          onCancel = {this.toggleDialog}
        />

      </div>
    )
  }
}

export default withRouter(Article);