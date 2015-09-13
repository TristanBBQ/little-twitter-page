import React from 'react';

class TweetComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.debug(this.props.tweet);
  }

  render() {
    return (
      <div>
        <a>{this.props.tweet.text}</a>
      </div>
    )
  }
}

TweetComponent.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default TweetComponent;
