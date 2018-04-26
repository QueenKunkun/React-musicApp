import React from 'react';
import '../less/progress.less';

let Progress = React.createClass({
  getDefaultProps() {
    return {
      barColor: 'green'
    }
  },
  changeProgress(e) {
    let progressBar = this.refs.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.onProgressChange && this.props.onProgressChange(progress);
  },
  render() {
    return <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
        <div className="progress" style={{ width: `${this.props.progress}%`,background: this.props.barColor }} />
      </div>;
  }
});

export default Progress;
