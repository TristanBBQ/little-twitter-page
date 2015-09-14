import React from 'react';
import { Navigation } from 'react-router';

import TweetsComponent from './TweetsComponent.jsx';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: this.getBackgroundColor(),
      fontColor: this.getFontColor(),
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
          this.saveOrderedColumns();
        }
      });
      $("#sortableTweetsComponents").disableSelection();
    });
  }

  getOrderedColumns() {
    let defaultOrderedColumns = ['AppDirect', 'laughingsquid', 'techcrunch'];
    if(typeof(Storage) !== "undefined") {
      let ordered_columns_string = window.localStorage.getItem('little-twitter-page:ordered_columns');
      if (!ordered_columns_string) {
        window.localStorage.setItem('little-twitter-page:ordered_columns', defaultOrderedColumns);
        return defaultOrderedColumns;
      } else {
        return ordered_columns_string.split(',');
      }
    } else {
      console.info('No Web Storage Support');
      return defaultOrderedColumns;
    }
  }

  getBackgroundColor() {
    let defaultBackgroundColor = '#fff';
    if(typeof(Storage) !== "undefined") {
      let backgroundColor = window.localStorage.getItem('little-twitter-page:background_color');
      if (!backgroundColor) {
        window.localStorage.setItem('little-twitter-page:background_color', defaultBackgroundColor);
        return defaultBackgroundColor;
      } else {
        return backgroundColor;
      }
    } else {
      console.info('No Web Storage Support');
      return defaultBackgroundColor;
    }
  }

  getFontColor() {
    let defaultFontColor = '#000';
    if(typeof(Storage) !== "undefined") {
      let fontColor = window.localStorage.getItem('little-twitter-page:font_color');
      if (!fontColor) {
        window.localStorage.setItem('little-twitter-page:font_color', defaultFontColor);
        return defaultFontColor;
      } else {
        return fontColor;
      }
    } else {
      console.info('No Web Storage Support');
      return defaultFontColor;
    }
  }

  saveOrderedColumns() {
    let tweetsComponents = $('.TweetsComponent');
    window.localStorage.setItem('little-twitter-page:ordered_columns', [tweetsComponents[0].id, tweetsComponents[1].id, tweetsComponents[2].id]);
    console.info('Settings saved!');
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
    if (event.target.id == 'backgroundColor') {
      window.localStorage.setItem('little-twitter-page:background_color', event.target.value);
    } else if (event.target.id == 'fontColor') {
      window.localStorage.setItem('little-twitter-page:font_color', event.target.value);
    }
  }

  render() {
    return (
      <div className="MainComponent" style={{backgroundColor: this.state.backgroundColor, color: this.state.fontColor}}>
        <div className="editColors">
          <button className="btn btn-default" data-toggle="collapse" data-target="#editColorsOptions" aria-expanded="false" aria-controls="editColorsOptions">
            <i className="fa fa-paint-brush"></i>
          </button>
          <div className="collapse editColorsOptions well" id="editColorsOptions">
            <label>Background:</label>
            <input type="color" className="form-control" id="backgroundColor" defaultValue={this.state.backgroundColor} onChange={this.handleInputChange.bind(this)}/>
            <label className="fontColor">Font:</label>
            <input type="color" className="form-control" id="fontColor" defaultValue={this.state.fontColor} onChange={this.handleInputChange.bind(this)}/>
          </div>
        </div>
        <div className="header">
          Little Twitter Page
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
