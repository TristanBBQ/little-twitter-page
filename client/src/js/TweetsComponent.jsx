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
      <div className="TweetsComponent">
        <div className="screen-name">
          {`@${this.props.screenName}`}
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
