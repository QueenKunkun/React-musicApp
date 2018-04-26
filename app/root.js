import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musicList';
import { MUSIC_LIST } from './config/musicliat';

let Root = React.createClass({
  getInitialState() {
    console.log('MUSIC_LIST', MUSIC_LIST);
    return {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0],
    };
  },
  componentDidMount() {
    $('#player').jPlayer({
      ready: function() {
        console.log('1111');
        $(this)
          .jPlayer('setMedia', {
            // mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
            mp3: 'http://pic.ibaotu.com/00/58/90/86y888piCftQ.mp3'
          })
          .jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });
  },
  render() {
    return (
      <div>
        <Header />
        {/* <Player
        currentMusicItem={this.state.currentMusicItem}/>
        <div id="player" /> */}
        <MusicList
          currentMusicItem={this.state.currentMusicItem}
          musicList={this.state.musicList}
        />
      </div>
    );
  }
});

export default Root;
