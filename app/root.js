import React from 'react';
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router';
import Pubsub from 'pubsub-js';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musicList';
import { MUSIC_LIST } from './config/musicliat';

let App = React.createClass({
  getInitialState() {
    return {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0]
    };
  },
  playMusic(musicItem) {
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.file
    }).jPlayer('play');
    this.setState({
      currentMusicItem: musicItem
    })
  },
  playNext(type="next") {
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length;
    if(type === "next") {
      newIndex = (index + 1) % musicListLength;
    } else {
      newIndex = (index - 1 + musicListLength) % musicListLength;
    }
    this.playMusic(this.state.musicList[newIndex]);
  },
  findMusicIndex(musicItem){
    return this.state.musicList.indexOf(musicItem);
  },
  componentDidMount() {
    $('#player').jPlayer({
      // ready: function() {
      //   $(this)
      //     .jPlayer('setMedia', {
      //       // mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
      //       mp3: 'http://pic.ibaotu.com/00/58/90/86y888piCftQ.mp3'
      //     })
      //     .jPlayer('play');
      // },
      supplied: 'mp3',
      wmode: 'window'
    });
    this.playMusic(this.state.currentMusicItem);
    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext();
    });
    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item !== musicItem;
        })
      })
    });
    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem);
    });
    Pubsub.subscribe('PLAY_PREV', (msg)  => {
      this.playNext('prev');
    });
    Pubsub.subscribe('PLAY_NEXT', msg => {
      this.playNext();
    });
  },
  componentWillUnMount() {
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('DELETE_MUSIC');
    Pubsub.unsubscribe('PLAY_PREV');
    Pubsub.unsubscribe('PLAY_NEXT');
    $('#player').unbind($.jPlayer.event.ended);
  },
  render() {
    return (
      <div>
        <Header />
        {React.cloneElement(this.props.children, this.state)}
        {/* <Player
        currentMusicItem={this.state.currentMusicItem}/>
        <div id="player" /> */}
        {/* <MusicList
          currentMusicItem={this.state.currentMusicItem}
          musicList={this.state.musicList}
        /> */}
      </div>
    );
  }
});
let Root = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Player} />
          <Route path="/list" component={MusicList} />
        </Route>
      </Router>
    );
  }
});

export default Root;
