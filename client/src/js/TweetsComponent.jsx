import React from 'react';

import TweetComponent from './TweetComponent.jsx';

class TweetsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    };
  }

  componentDidMount() {
    this.getTweets();
  }

  getTweets() {
    $.ajax({
      type: 'GET',
      url: `http://127.0.0.1:3000/?screenName=${this.props.screenName}&count=${this.props.count}`,
    }).done((response) => {
      this.setState({
        tweets: response
      })
    })
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
          <input type="number" className="form-control" id="input-count" placeholder="30" />
          <span>tweets</span>
          <div className="actions">
            <button className="btn btn btn-default cancel"  data-toggle="collapse" data-target={`#settings-${this.props.screenName}`} aria-expanded="false" aria-controls={`settings-${this.props.screenName}`}>Cancel</button>
            <button className="btn btn btn-info save">Save</button>
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
