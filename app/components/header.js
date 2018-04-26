import React from 'react'
import '../less/header.less';

let Header = React.createClass({
  render() {
    return <div className="components-header row">
        <img src="/app/images/logo.png" width="40" alt="" className="-col-auto" />
        <h1 className="caption">React Music player</h1>
      </div>;
  }
});

export default Header;
