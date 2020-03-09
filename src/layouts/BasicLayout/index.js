import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { getLocale } from 'umi-plugin-locale';

@connect(({ globalModel }) => ({ globalModel }))
class Index extends Component {
  state = {
    script: undefined,
    timer: undefined,
  };

  componentDidMount() {
    const {
      dispatch,
      globalModel: { lang },
    } = this.props;
    const { script } = this.state;

    dispatch({
      type: 'globalModel/Setlang',
      payload: {
        lang: getLocale().toLowerCase() || lang,
      },
    });

    if (!script) {
      this.createZendes();
    }
  }

  createZendes = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.id = 'ze-snippet';
    script.src =
      'https://static.zdassets.com/ekr/snippet.js?key=b6291a9c-d3e0-4123-882a-aaf0c125bb85';
    document.body.appendChild(script);
    this.setState({ script });
    const _this = this;
    script.onload = function() {
      _this.checkBtnShow();
    };
  };

  checkBtnShow() {
    const { location } = this.props;
    let { timer } = this.state;
    const iframe = document.querySelector('#launcher');
    if (iframe) {
      iframe.style.display = location.pathname !== '/zendesk' ? 'none' : 'block';
      clearTimeout(timer);
      return;
    }
    const _this = this;
    timer = setTimeout(function() {
      _this.checkBtnShow();
    }, 500);
    this.setState({ timer });
  }

  render() {
    const { children } = this.props;
    return <div className={styles.basicLayout}>{children}</div>;
  }
}

export default Index;
