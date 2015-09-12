import React from 'react';
import Router , { Route, DefaultRoute, RouteHandler, Link, Navigation } from 'react-router';

import MainComponent from './MainComponent.js';

// App initialization
var App = React.createClass({
  render() {
    return (
      <div>
        <RouteHandler />
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route path="/" name="home" handler={MainComponent}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
