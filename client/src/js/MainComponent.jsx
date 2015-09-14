import React from 'react';
import { Navigation } from 'react-router';

import TweetsComponent from './TweetsComponent.jsx';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ordered_columns: this.getOrderedColumns()
    };
  }

  componentDidMount() {
    this.setupDraggableTweetsComponents();
  }

  setupDraggableTweetsComponents() {
    $(() => {
      $("#sortableTweetsComponents").sortable({
        cursor: "move",
        update: (event, ui) => {
          this.saveSettings();
        }
      });
      $("#sortableTweetsComponents").disableSelection();
    });
  }

  getOrderedColumns() {
    if(typeof(Storage) !== "undefined") {
      let ordered_columns_string = window.localStorage.getItem('little-twitter-page:ordered_columns');
      if (!ordered_columns_string) {
        let ordered_columns = ['AppDirect', 'laughingsquid', 'techcrunch'];
        window.localStorage.setItem('little-twitter-page:ordered_columns', ordered_columns);
        return ordered_columns;
      } else {
        return ordered_columns_string.split(',');
      }
    } else {
      console.info('No Web Storage Support');
    }
  }

  saveSettings() {
    let tweetsComponents = $('.TweetsComponent');
    window.localStorage.setItem('little-twitter-page:ordered_columns', [tweetsComponents[0].id, tweetsComponents[1].id, tweetsComponents[2].id]);
    console.info('Settings saved!');
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
              <TweetsComponent screenName={this.state.ordered_columns[0]}/>
            </div>
          </li>
          <li>
            <div className="row-container">
              <TweetsComponent screenName={this.state.ordered_columns[1]}/>
            </div>
          </li>
          <li>
            <div className="row-container">
              <TweetsComponent screenName={this.state.ordered_columns[2]}/>
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
