import React, {Component} from 'react'
import { connect }  from 'react-redux';
import PropTypes from 'prop-types'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core';
import Loading from '../../components/loading/index';

/* actions */
import { fetchAuthors } from '../../actions/authors';

class AuthorsList extends Component{
  static defaultProps = {
    checked: [],
    onAuthorSelected: ()=>{},
  };

  constructor(props){
    super(props);
    this.state = {
      checked: [],
      loading: false
    };
  }

  componentDidMount(){
    if(this.props.authors.length === 0){
      this.setState({
        loading: true
      }, async ()=>{
        await this.props.fetchAuthors();
        this.setState({loading: false});
      })
    }
  }

  render(){
    const {
      authors,
      checked,
      onAuthorSelected
    } = this.props;

    const {
      loading
    } = this.state;

    if(loading){
      return <Loading/>;
    } else {
      return (
        <List>
          {authors.map(author => {
            return (
              <ListItem key={author._id} role={undefined} dense button onClick={()=>{onAuthorSelected(author)}}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(author._id) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={author.name} />
              </ListItem>
            );
          })}
        </List>
      )
    }
  }
}

AuthorsList.propTypes = {
  authors: PropTypes.array.isRequired
}

function mapStateToProps(state){
  return {
    authors: state.authors
  }
}

export default connect(mapStateToProps, {fetchAuthors})(AuthorsList);