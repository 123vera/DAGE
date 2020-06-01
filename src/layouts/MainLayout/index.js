import React, { Component } from 'react';
import { connect } from 'dva';
import Footer from '../../components/common/Footer';
import WechatMsg from '../../components/common/WechatMsg';
import styles from './index.less';

@connect(({ global }) => ({ global }))
class Index extends Component {
  state = {
    showMsg: false,
  };

  componentDidMount() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') !== -1;

    // 微信环境中 提示打开浏览器
    if (isWeixin) {
      this.setState({ showMsg: true });
    }
  }

  render() {
    const { children } = this.props;
    const { showMsg } = this.state;
    return (
      <div className={styles.mainLayout}>
        {children}
        <Footer />
        {showMsg && <WechatMsg />}
      </div>
    );
  }
}

export default Index;
