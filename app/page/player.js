import React from 'react';
import { Link } from 'react-router';
import Pubsub from 'pubsub-js';
import Progress from '../components/progress';
import '../less/player.less';

let duration = null;
let Player = React.createClass({
  getInitialState() {
    return {
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: ''
    };
  },
  playPrev() {
    Pubsub.publish('PLAY_PREV');
  },
  playNext() {
    Pubsub.publish('PLAY_NEXT');
  },
  formatTime(time) {
    time = Math.floor(time);
    let miniutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${miniutes}:${seconds}`;
  },
  componentDidMount() {
    this.mounted = true; //flag
    $('#player').bind($.jPlayer.event.timeupdate, e => {
      duration = e.jPlayer.status.duration;
      if (this.mounted) {
        this.setState({
          volume: e.jPlayer.options.volume * 100,
          progress: Math.round(e.jPlayer.status.currentPercentAbsolute),
          leftTime: this.formatTime(duration *
            (1 - e.jPlayer.status.currentPercentAbsolute / 100))
        });
      }
    });
  },
  componentWillUnMount() {
    this.mounted = false; //重置flag
    $('#player').unbind($.jPlayer.event.timeupdate);
  },
  progressChangeHandler(progress) {
    // console.log('progressChangeHandler', progress);
    $('#player').jPlayer('play', duration * progress);
  },
  changeVolumeHandler(progress) {
    $('#player').jPlayer('volume', progress);
  },
  play() {
    if (this.state.isPlay) {
      $('#player').jPlayer('pause');
    } else {
      $('#player').jPlayer('play');
    }
    if (this.mounted) {
      this.setState({
        isPlay: !this.state.isPlay
      });
    }
  },
  render() {
    return (
      <div className="player-page">
        <h1 className="caption">
          <Link to="/list">我的私人音乐坊&gt;</Link>
        </h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
            <h3 className="music-artist mt10">
              {this.props.currentMusicItem.artist}
            </h3>
            <div className="row mt20">
              <div className="left-time -col-auto">
                -{this.state.leftTime}
              </div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{ top: 5, left: -5 }} />
                <div className="volume-wrapper">
                  <Progress
                    progress={this.state.volume}
                    onProgressChange={this.changeVolumeHandler}
                    barColor="#aaa"
                  />
                </div>
              </div>
            </div>
            <div style={{ height: 10, lineHeight: '10px', marginTop: '10px' }}>
              <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler} barColor={this.state.barColor} />
            </div>
            <div className="mt35 row">
              <div>
                <i className="icon prev" onClick={this.playPrev} />
                <i
                  className={`icon ml20 ${
                    this.state.isPlay ? 'pause' : 'play'
                  }`}
                  onClick={this.play}
                />
                <i className="icon next ml20" onClick={this.playNext} />
              </div>
              <div className="-col-auto">
                <i className="icon repeat-cycle" />
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img
              ref="imgAnimation"
              src={this.props.currentMusicItem.cover}
              alt={this.props.currentMusicItem.title}
            />
          </div>
        </div>
      </div>
    );
  }
});

export default Player;
