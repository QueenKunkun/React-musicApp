import React from 'react';
import Header from './components/header';
import Progress from './components/progress'

let duration = null;
let Root = React.createClass({
  getInitialState() {
    return {
      progress: '-'
    }
  },
  componentDidMount() {
    $('#player').jPlayer({
      ready: function () {
        console.log('1111');
        $(this)
          .jPlayer('setMedia', {
            mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
            // mp3: 'http://pic.ibaotu.com/00/58/90/86y888piCftQ.mp3'
          })
          .jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: Math.round(e.jPlayer.status.currentPercentAbsolute)
      });
    });
  },
  componentWillUnMount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  },
  progressChangeHandler(progress) {
    console.log('progressChangeHandler', progress);
    $('#player').jPlayer('play', duration * progress);
  },
  render() {
    return(
      <div>
        <Header />
        <Progress
          progress={this.state.progress}
          onProgressChange={this.progressChangeHandler}
          barColor="#ff0000"
        />
        <div id="player" />
    </div>);
  }
});

export default Root;
