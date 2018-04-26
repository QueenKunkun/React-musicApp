import React from 'react';
import '../less/musicListItem.less';

let MusicListItem = React.createClass({
  render() {
    let musicItem = this.props.musicItem;
    return <li className={`components-musiclistitem row ${this.props.focus? 'focus' : '' }`}>
        <p>
          <strong>{musicItem.title}</strong>-{musicItem.artist}
        </p>
        <p className="-col-auto delete" />
      </li>;
  }
});

export default MusicListItem;
