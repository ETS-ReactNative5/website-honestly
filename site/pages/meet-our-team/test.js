import React from 'react';
import { mount } from 'enzyme';
import createStateNavigator from '../../routes';
import MeetOurTeam from '.';

describe('site/team-slice', () => {
  it('should render badgers list', () => {
    const stateNavigator = createStateNavigator();
    stateNavigator.navigate('badgers', null, 'none');

    const context = {
      context: { stateNavigator },
      childContextTypes: { stateNavigator: React.PropTypes.object },
    };

    const teamSlice = mount(
      <MeetOurTeam
        categories={['everyone']}
        category="everyone"
        badgers={[{ firstName: 'Alex' }]}
        page={1}
      />, context);

    expect(teamSlice.find('ul').at(1).text()).to.match(/Alex/);
    expect(teamSlice.find('ul').at(1).text()).to.match(/Are you a potential Badger/);
  });

  describe('with 20 Badgers, first page of Everyone', () => {
    it('should render badgers list with advert and link to page 2', () => {
      const stateNavigator = createStateNavigator();
      stateNavigator.navigate('badgers', null, 'none');

      const context = {
        context: { stateNavigator },
        childContextTypes: { stateNavigator: React.PropTypes.object },
      };
      const badgers = [];
      for (let i = 0; i < 20; i += 1) {
        badgers.push({ firstName: 'Alex ' + i });
      }

      const teamSlice = mount(
        <MeetOurTeam
          categories={['everyone']}
          category="everyone"
          badgers={badgers}
          page={1}
        />, context);

      expect(teamSlice.find('ul').last().text()).to.match(/Alex 0/);
      expect(teamSlice.find('ul').last().text()).to.match(/Alex 18/);
      expect(teamSlice.find('ul').last().text()).to.match(/Are you a potential Badger/);
      expect(teamSlice.find('ul').last().text()).to.not.match(/Alex 19/);
      expect(teamSlice.find('a').find({ children: 'Previous page' }).props().href).to.equal(null);
      expect(teamSlice.find('a').find({ children: 'Next page' }).props().href)
        .to.equal('/about-us/people/category/everyone/page-2');
    });
  });

  describe('with 20 Badgers, second page of Everyone', () => {
    it('should render badgers list with no advert and link to page 1', () => {
      const stateNavigator = createStateNavigator();
      stateNavigator.navigate('badgers', { page: 2 }, 'none');

      const context = {
        context: { stateNavigator },
        childContextTypes: { stateNavigator: React.PropTypes.object },
      };
      const badgers = [];
      for (let i = 0; i < 20; i += 1) {
        badgers.push({ firstName: 'Alex ' + i });
      }

      const teamSlice = mount(
        <MeetOurTeam
          categories={['everyone']}
          category="everyone"
          badgers={badgers}
          page={2}
        />, context);

      expect(teamSlice.find('ul').last().text()).to.match(/Alex 19/);
      expect(teamSlice.find('ul').last().text()).to.not.match(/Alex 18/);
      expect(teamSlice.find('ul').last().text()).to.not.match(/Are you a potential Badger/);
      expect(teamSlice.find('a').find({ children: 'Previous page' }).props().href)
        .to.equal('/about-us/people');
      expect(teamSlice.find('a').find({ children: 'Next page' }).props().href).to.equal(null);
    });
  });

  describe('with 20 Badgers, first page of Engineering', () => {
    it('should render badgers list with no advert and no link to page 2', () => {
      const stateNavigator = createStateNavigator();
      stateNavigator.navigate('badgers', { category: 'engineering' }, 'none');

      const context = {
        context: { stateNavigator },
        childContextTypes: { stateNavigator: React.PropTypes.object },
      };
      const badgers = [];
      for (let i = 0; i < 20; i += 1) {
        badgers.push({
          firstName: 'Alex ' + i,
          categories: [
            { name: 'Engineering', slug: 'engineering' },
          ],
        });
      }

      const teamSlice = mount(
        <MeetOurTeam
          categories={['everyone', 'engineering']}
          category="engineering"
          badgers={badgers}
          page={1}
        />, context);

      expect(teamSlice.find('ul').last().text()).to.match(/Alex 0/);
      expect(teamSlice.find('ul').last().text()).to.match(/Alex 18/);
      expect(teamSlice.find('ul').last().text()).to.match(/Alex 19/);
      expect(teamSlice.find('ul').last().text()).to.not.match(/Are you a potential Badger/);
      expect(teamSlice.find('a').find({ children: 'Previous page' }).props().href).to.equal(null);
      expect(teamSlice.find('a').find({ children: 'Next page' }).props().href).to.equal(null);
    });
  });
});
