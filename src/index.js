import React from 'react';
import { render } from 'react-dom';
import UserList from './UserList';

var users = [
  { name: 'James' },
  { name: 'Danielle' },
  { name: 'Lucy' },
  { name: 'Ernst' }
];

render(<UserList users={users} />, document.getElementById('main'));
