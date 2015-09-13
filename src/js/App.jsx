import React from 'react';
import Router , { Route, DefaultRoute, RouteHandler, Link, Navigation } from 'react-router';

import MainComponent from './MainComponent.jsx';

// Twitter API initialization
// let twitter_consumer_key = 'vJmPQ6Y9BWzOxsMouHkFpyPDs';
// let twitter_consumer_secret = 'KImiFrUMlAl5aZtbacP0WyWS4Tq4Uf2XBo08X4oHgGAr4gzAgC';
// let bearer_token_credentials = `${twitter_consumer_key}:${twitter_consumer_secret}`;
// var encoded_bearer_token_credentials = window.btoa(bearer_token_credentials);
//
// $.ajax({
//   method: "POST",
//   url: 'https://api.twitter.com/oauth2/token',
//   headers: {
//     'Authorization': `Basic ${encoded_bearer_token_credentials}`
//   },
//   data: {
//     'grant_type': "client_credentials"
//   }
// }).done((response) => {
//   console.debug(response);
// })

let bearer_token = "AAAAAAAAAAAAAAAAAAAAAJ4QhgAAAAAALfDFu06KaFURObCIE3o%2B2fY0xyw%3D3kbaUz3eYqvPzMlePyjS26eg3baxZoLacLVRBkOzexzZfYLu24";
window.BEARER_TOKEN = bearer_token;

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
