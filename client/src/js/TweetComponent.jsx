import React from 'react';
import moment from 'moment';

class TweetComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  convertToReadableDateString(rawString) {
    return moment(Date.parse(this.props.tweet.created_at)).format('h:mm A - D MMM YYYY');
  }

  render() {
    return (
      <div className="TweetComponent">
        <div>{this.props.tweet.text}</div>
        <div className="footer">
            <div className="createdAt">{this.convertToReadableDateString(this.props.tweet.created_at)}</div>
            <div className="twitterLink"><a href={'https://twitter.com/AppDirect/status/' + this.props.tweet.id_str}>View on Twitter</a></div>
        </div>
      </div>
    )
  }
}

TweetComponent.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default TweetComponent;
