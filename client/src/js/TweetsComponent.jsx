import React from 'react';

import TweetComponent from './TweetComponent.jsx';

class TweetsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.getCount(),
      tweets: []
    };
  }

  componentDidMount() {
    this.getTweets();
  }

  getTweets() {
    let count = this.getCount();
    $.ajax({
      type: 'GET',
      url: `http://127.0.0.1:3000/?screenName=${this.props.screenName}&count=${count}`,
    }).done((response) => {
      this.setState({
        count: count,
        tweets: response
      })
    })
  }

  getCount() {
    let count = window.localStorage.getItem(`little-twitter-page:${this.props.screenName}:count`);
    if (!count) {
      count = 30;
      window.localStorage.setItem(`little-twitter-page:${this.props.screenName}:count`, count);
    }
    return count;
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  saveSettings() {
    window.localStorage.setItem(`little-twitter-page:${this.props.screenName}:count`, this.state.count);
    this.getTweets();
  }

  render() {
    return (
      <div className="TweetsComponent" id={this.props.screenName}>
        <div className="settings-button">
          <button className="btn btn-xs btn-default" type="button" data-toggle="collapse" data-target={`#settings-${this.props.screenName}`} aria-expanded="false" aria-controls={`settings-${this.props.screenName}`}>
            <i className="fa fa-cog"></i>
          </button>
        </div>
        <div className="screen-name">
          {`@${this.props.screenName}`}
        </div>
        <div className="collapse settings well" id={`settings-${this.props.screenName}`}>
          <span>Show last</span>
          <input type="number" className="form-control" id="count" placeholder="30" defaultValue={this.state.count} onChange={this.handleInputChange.bind(this)} />
          <span>tweets</span>
          <div className="actions">
            <button className="btn btn btn-default cancel"  data-toggle="collapse" data-target={`#settings-${this.props.screenName}`} aria-expanded="false" aria-controls={`settings-${this.props.screenName}`}>Cancel</button>
            <button className="btn btn btn-info save" data-toggle="collapse" data-target={`#settings-${this.props.screenName}`} aria-expanded="false" aria-controls={`settings-${this.props.screenName}`} onClick={this.saveSettings.bind(this)}>Save</button>
          </div>
        </div>
        <div className="tweets">
          {this.state.tweets.map((tweet, index) => {
            return (
              <TweetComponent key={tweet.id_str} tweet={tweet} />
            )
          })}
        </div>
      </div>
    )
  }
}

TweetsComponent.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default TweetsComponent;
