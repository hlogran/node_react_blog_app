import React, { Component } from 'react';
import {
  Modal as MUModal,
  Button
} from '@material-ui/core';
import AuthorsList from '../authorsList';

import './styles.css';

class ModalAuthorsList extends Component {

  static defaultProps = {
    show: false,
    onAccept: ()=>{},
    onClose: ()=>{},
    authorsSelected: []
  };

  constructor(props) {
    super(props);
    this.state = {
      prevShow: false,
      checked: [],
      authorsSelected: []
    }
    this.onAuthorSelected = this.onAuthorSelected.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.show !== state.prevShow){
      return {
        checked: props.authorsSelected.map(x => x._id),
        authorsSelected: props.authorsSelected,
        prevShow: props.show
      }
    } else {
      return state;
    }
  }

  render() {
    const {
      show
    } = this.props;

    const {
      checked
    } = this.state;

    return (
      <MUModal
        open={show}
        onClose={this.onClose}
      >
        <div className={'ModalAuthorsList'} >
          <div className={'ModalAuthorsList-container'}>
            <div className={'ModalAuthorsList-header'}>
              <h3>Authors</h3>
            </div>
            <div className={'ModalAuthorsList-body'}>
              <AuthorsList
                checked={checked}
                onAuthorSelected={this.onAuthorSelected}
              />
            </div>
            <div className={'ModalAuthorsList-footer'}>
              <Button variant="contained" color="secondary" onClick={this.onClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={this.onAccept}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      </MUModal>
    );
  }

  onAccept(){
    const {
      authorsSelected
    } = this.state;
    this.props.onAccept(authorsSelected);
    this.onClose();
  }

  onClose(){
    this.props.onClose();
  }

  onAuthorSelected(author){
    const{
      authorsSelected
    } = this.state;

    const id = author._id;

    let newAuthors = [];

    if(authorsSelected.some(x => x._id === id)){
      newAuthors = authorsSelected.filter(x => x._id !== id);
    } else {
      newAuthors = [...authorsSelected, author];
    }

    this.setState({
      checked: newAuthors.map(x => x._id),
      authorsSelected: newAuthors
    });
  }
}

export default ModalAuthorsList;
