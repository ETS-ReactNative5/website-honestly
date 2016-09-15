import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import parseRouter from '.';

const A = () => <div>A</div>;
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={A}>
      <IndexRoute component={A} />
      <Route path="*" component={A} />
      <Route path="/hello/world" component={A} />
    </Route>
  </Router>
);

describe('site/compiler/router-parser', () => {
  it('parses routes component into a nicer data structure', () => {
    const parsed = parseRouter(routes);
    expect(parsed).to.deep.equal([
      {
        indexRoute: false,
        numChildren: 3,
        path: '/',
      },
      {
        indexRoute: true,
        numChildren: 0,
        path: '/',
      },
      {
        indexRoute: false,
        numChildren: 0,
        path: '/*',
      },
      {
        indexRoute: false,
        numChildren: 0,
        path: '/hello/world',
      },
    ]);
  });
});
