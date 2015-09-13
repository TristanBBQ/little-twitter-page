import React from 'react';
import { Navigation } from 'react-router';

import TweetsComponent from './TweetsComponent.jsx';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="MainComponent">
        <div className="row">
          <div className="header">
            Most Recent Tweets
          </div>
        </div>
        <div className="row">
          <div className="row-container">
            <TweetsComponent screenName="AppDirect" count="30"/>
          </div>
          <div className="row-container">
            <TweetsComponent screenName="laughingsquid" count="30"/>
          </div>
          <div className="row-container">
            <TweetsComponent screenName="techcrunch" count="30"/>
          </div>
        </div>
      </div>
    );
  }
};

MainComponent.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default MainComponent;
