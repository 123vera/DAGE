import React, { Component } from 'react';
import ReactPullLoad, { STATS } from 'react-pullload';
import 'react-pullload/dist/ReactPullLoad.css';
import './index.less';

class ListView extends Component {
  state = {
    action: STATS.init,
  };

  handleAction = action => {
    console.info(action, this.state.action, action === this.state.action);
    if (action === this.state.action) {
      return false;
    }
    if (action === STATS.refreshing) {
      this.handRefreshing(); // 刷新
    } else if (action === STATS.loading) {
      this.handLoadMore(); // 加载更多
    } else {
      this.setState({ action: action });
    }
  };

  handRefreshing = () => {
    if (STATS.refreshing === this.state.action) {
      return false;
    }
    const { onRefresh } = this.props;
    if (!onRefresh) return false;
    onRefresh && onRefresh(() => this.setState({ action: STATS.refreshed }));
    this.setState({ action: STATS.refreshing });
  };

  handLoadMore = () => {
    if (STATS.loading === this.state.action) {
      return false;
    }
    const { onLoadMore, hasMore } = this.props;
    if (!hasMore || !onLoadMore) {
      return false;
    }
    onLoadMore && onLoadMore(() => this.setState({ action: STATS.reset }));
    this.setState({ action: STATS.loading });
  };

  render() {
    const { hasMore } = this.props;
    const { action } = this.state;
    return (
      <ReactPullLoad
        downEnough={150}
        action={action}
        handleAction={this.handleAction}
        hasMore={hasMore}
        distanceBottom={300}
      >
        {this.props.children}
      </ReactPullLoad>
    );
  }
}

export default ListView;
