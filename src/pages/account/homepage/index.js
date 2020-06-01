import React, { Component } from 'react';
import SelectLang from '../../../components/common/SelectLang';
import styles from './index.less';
import { router } from 'umi';
import { formatMessage } from 'umi-plugin-locale';

class Index extends Component {
  state = {
    showMsg: false,
  };

  render() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') !== -1;

    return (
      <div id={styles.homepageBg}>
        <div className={styles.langWrapper}>
          <SelectLang />
        </div>

        <h2>{formatMessage({ id: `HOMEPAGE_TITLE` })}</h2>

        <div className={styles.btnGroup}>
          <button
            onClick={() => {
              if (isWeixin) {
                this.setState({ showMsg: true });
              } else {
                router.push('/account/login');
              }
            }}
            className={`${styles.btn} ${styles.login}`}
          >
            {formatMessage({ id: `LOGIN` })}
          </button>
          <button
            onClick={() => {
              if (isWeixin) {
                this.setState({ showMsg: true });
              } else {
                router.push('/account/register');
              }
            }}
            className={`${styles.btn} ${styles.reg}`}
          >
            {formatMessage({ id: `REGISTER_TITLE_01` })}
          </button>
        </div>
      </div>
    );
  }
}
export default Index;
