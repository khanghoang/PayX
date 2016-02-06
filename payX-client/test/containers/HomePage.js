import {
  mount
} from 'enzyme';
import React from 'react';
import {expect} from 'chai';
import HomePage from '../../app/containers/HomePage';

describe('Home Page', () => {
  it('it renders Home Page in on div', () => {
    const homePage = mount(
      <HomePage />
    );

    expect(homePage.find('.HomePage')).to.have.length(1);
  });
});
