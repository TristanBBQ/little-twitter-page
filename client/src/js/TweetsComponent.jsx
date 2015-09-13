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
      type: 'GET',
      url: `http://127.0.0.1:3000/?screenName=${this.props.screenName}&count=${this.props.count}`,
    }).done((response) => {
      console.debug(response);
    })
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
