import React from 'react';
import Pubsub from 'pubsub-js';
// import { hashHistory } from 'react-router';
import '../less/musicListItem.less';

let MusicListItem = React.createClass({
  playMusic(musicItem) {
    Pubsub.publish('PLAY_MUSIC', musicItem);
    // hashHistory.push('/');
  },
  deleteMusic(musicItem, e) {
    e.stopPropagation();
    Pubsub.publish('DELETE_MUSIC', musicItem);
  },
  render() {
    let musicItem = this.props.musicItem;
    return (
      <li
        className={`components-musiclistitem row ${
          this.props.focus ? 'focus' : ''
        }`}
        onClick={this.playMusic.bind(this, musicItem)}
      >
        <p>
          <strong>{musicItem.title}</strong>-{musicItem.artist}
        </p>
        <p
          className="-col-auto delete"
          onClick={this.deleteMusic.bind(this, musicItem)}
        />
      </li>
    );
  }
});

export default MusicListItem;
