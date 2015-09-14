import React from 'react';
import { Navigation } from 'react-router';

import TweetsComponent from './TweetsComponent.jsx';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setupDraggableTweetsComponents();
    this.loadSettings();
  }

  loadSettings() {
    if(typeof(Storage) !== "undefined") {
      // window.localStorage.setItem('test', 'helloworld');
      console.debug(window.localStorage.getItem('test'));
    } else {
      console.info('No Web Storage Support');
    }
  }

  setupDraggableTweetsComponents() {
    $(() => {
      $("#sortableTweetsComponents").sortable();
      $("#sortableTweetsComponents").disableSelection();
    });
  }

  render() {
    return (
      <div className="MainComponent">
        <div className="header">
          Most Recent Tweets
        </div>
        <ul id="sortableTweetsComponents">
          <li>
            <div className="row-container">
              <TweetsComponent screenName="AppDirect" count="30"/>
            </div>
          </li>
          <li>
            <div className="row-container">
              <TweetsComponent screenName="laughingsquid" count="30"/>
            </div>
          </li>
          <li>
            <div className="row-container">
              <TweetsComponent screenName="techcrunch" count="30"/>
            </div>
          </li>
        </ul>
      </div>
    );
  }
};

MainComponent.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default MainComponent;
