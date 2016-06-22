import React from 'react';
import test from 'tape';

import { shallow, render, mount } from 'enzyme';
import { spy } from 'sinon';
import { jsdom } from 'jsdom';

global.window = global.document = jsdom();

import UserList from '../src/UserList';

var userData = [
  { name: 'Steve' },
  { name: 'Tony'  },
  { name: 'Phil'  },
  { name: 'Bobbi' }
];

test('<UserList /> renders correctly', function (t) {
  var shallowWrapper = shallow(<UserList users={userData} />);
  var staticWrapper  = render(<UserList users={userData} />);

  t.equal(shallowWrapper.find('h1').length, 1, 'find h1 with shallow' );
  t.equal(staticWrapper.find('h1').length, 1,  'find h1 with static' );


  t.equal(shallowWrapper.find('li').length, 0, 'no <li>s in shallow render');
  t.equal(shallowWrapper.find('User').length, userData.length, '<User>s in shallow render');


  t.equal(staticWrapper.find('li').length, userData.length, '<li>s in static render');
  t.equal(staticWrapper.find('User').length, 0, 'no <Users>s in static render');

  t.end();
});

test('<UserList /> can filter users', function (t) {
  var wrapper = shallow(<UserList users={userData} />);

  t.equal(wrapper.state('filter'), '', 'state starts as empty string');
  t.equal(wrapper.find('User').length, userData.length, 'initial state: displays all users');

  wrapper.setState({ filter: 'e' });

  t.equal(wrapper.state('filter'), 'e');
  t.equal(wrapper.find('User').length, 1, 'filtered state: does not show all users');
  t.end();
});

test('<UserList /> calls shouldComponentUpdate', function (t) {

  spy(UserList.prototype, 'shouldComponentUpdate');
  var wrapper = mount(<UserList users={userData} />);

  t.equal(UserList.prototype.shouldComponentUpdate.callCount, 0, 'no calls yet');
  wrapper.setState({ filter: 'e' });
  t.equal(UserList.prototype.shouldComponentUpdate.callCount, 1, 'called when state changed');
  t.end();
});
