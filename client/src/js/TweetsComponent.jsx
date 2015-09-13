import React from 'react';
import $ from 'jquery';

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
        {this.state.tweets.map((tweet, index) => {
          return (
            <div key={index}>{tweet.text}</div>
          )
        })}
      </div>
    )
  }
}

TweetsComponent.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default TweetsComponent;
