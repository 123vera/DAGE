import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import PageHeader from '@/components/common/PageHeader';
import NEXT_STEP from '@/assets/dark/next-step.png';
import styles from './index.less';

class Index extends Component {
  state = { account: '' };

  render() {
    return (
      <div id={styles.setAccount}>
        <PageHeader />
        <div className={styles.mainContent}>
          <p>{formatMessage({ id: `SELECT_NEW_ACCOUNT` })}</p>

          <section className={styles.setNew}>
            <label htmlFor="account">
              <span>{formatMessage({ id: `SELECT_NEW_ACCOUNT` })}</span>
              <input
                id="account"
                type="text"
                autoComplete="off"
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_ACCOUNT` })}
                onChange={e => this.setState({ account: e.target.value })}
              />
            </label>
            <img className={styles.nextStep} src={NEXT_STEP} alt="" />
          </section>
        </div>
      </div>
    );
  }
}

export default Index;
