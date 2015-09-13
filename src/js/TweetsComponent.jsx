import React from 'react';
import $ from 'jquery';

class TweetsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getTweets();
  }

  getTweets() {
    $.ajax({
      url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=AppDirect&count=30',
      dataType: "jsonp",
      headers: {
        'Authorization': 'Bearer ' + window.BEARER_TOKEN
      }
      success: function (data) {
        console.log(data)
        alert(data);
      }
    });
  }

  render() {
    return (
      <div className="TweetsComponent">
        TweetsComponent
        {this.props.screenName}
      </div>
    )
  }
}

TweetsComponent.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default TweetsComponent;
