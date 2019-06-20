import React, {Component} from 'react'
import {
  Button,
  TextField
} from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterList';
import AuthorsList from '../authorsList';

import './styles.css';

class Filters extends Component{
  static defaultProps = {onApply: ()=>{}};

  constructor(props){
    super(props);
    this.state = {
      title: '',
      checkedAuthors: []
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onAuthorSelected = this.onAuthorSelected.bind(this);
    this.onApply = this.onApply.bind(this);
  }

  render() {
    const{
      title,
      checkedAuthors
    } = this.state;

    return (
      <div className="Filters">
        <h2>Filters</h2>

        {/*search by title*/}
        <h4>Title</h4>
        <TextField
          id="title"
          value={title}
          onChange={this.onInputChange}
          placeholder={'Title'}
          margin="normal"
          fullWidth
        />

        {/*search by authors*/}
        <h4>Authors</h4>
        <AuthorsList
          checked={checkedAuthors}
          onAuthorSelected={this.onAuthorSelected}
        />

        {/*buttons*/}
        <div className={'Filters-buttons'}>
          <Button variant="contained" color="secondary" onClick={this.onApply}>
            Apply
            <FilterIcon>Apply filter</FilterIcon>
          </Button>
        </div>
      </div>
    );
  }

  onInputChange(e) {
    this.setState({
     [e.target.id]: e.target.value
    });
  }

  onAuthorSelected(author){
    const{
      checkedAuthors
    } = this.state;

    const id = author._id;

    if(checkedAuthors.indexOf(id)>-1){
      this.setState({checkedAuthors: checkedAuthors.filter(x => x !== id)});
    } else {
      this.setState({checkedAuthors: [...checkedAuthors, id]});
    }
  }

  onApply(){
    const {
      title,
      checkedAuthors
    } = this.state;

    this.props.onApply(title, checkedAuthors);
  }
}

export default Filters;
