import React from 'react';
import User from './User';

const UserList = React.createClass({
  getInitialState() {
    return {
      filter: ''
    };
  },
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.filter !== this.state.filter;
  },
  render() {
    var users = this.props.users;
    var filter = this.state.filter.toLowerCase();

    return (<div>
      <h1> Users </h1>
      <input onChange={this.handleChange} />
      <ul>
        {users
          .filter(user => user.name.toLowerCase().indexOf(filter) > -1)
          .map((user, i) => <User key={i} user={user} />)}
      </ul>
    </div>);
  },
  handleChange(evt) {
    this.setState({
      filter: evt.target.value
    });
  }
});

export default UserList;
