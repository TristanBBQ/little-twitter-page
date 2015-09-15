import React from 'react';
import Router , { Route, DefaultRoute, RouteHandler, Link, Navigation } from 'react-router';

import MainComponent from './MainComponent.jsx';

// Global variables
let bearer_token = "AAAAAAAAAAAAAAAAAAAAAJ4QhgAAAAAALfDFu06KaFURObCIE3o%2B2fY0xyw%3D3kbaUz3eYqvPzMlePyjS26eg3baxZoLacLVRBkOzexzZfYLu24";
window.BEARER_TOKEN = bearer_token;
window.SERVER_URL = "http://appdirect.tristanbbq.com:3000"

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
