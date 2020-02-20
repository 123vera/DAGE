import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import PageHeader from '@/components/common/PageHeader';
import NEXT_STEP from '@/assets/dark/next-step.png';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import styles from './index.less';
import { REG } from '../../../utils/constants';
import { Toast } from 'antd-mobile';
import { router } from 'umi';

class Index extends Component {
  state = { accountNum: '', code: '' };

  onChangeAccount = e => {
    if (!REG.ACCOUNT_NAME(e.target.value)) return;
    this.setState({ accountNum: e.target.value });
  };

  onChangeCode = e => {
    if (!REG.IDCARD(e.target.value)) return;
    this.setState({ code: e.target.value });
  };

  toNext = () => {
    const { accountNum, code } = this.state;
    if (accountNum === '') {
      Toast.info('请输入您想创建的用户名');
      return;
    }

    if (!REG.ACCOUNT_NAME.test(accountNum)) {
      Toast.info('请创建包含数字及字母的6~12位用户名');
      return;
    }

    if (code === '') {
      Toast.info('请输入DID邀请码');
      return;
    }

    Toast.info('创建账户成功', () => router.goBack());
  };

  render() {
    const { accountNum, code } = this.state;

    return (
      <div id={styles.setAccount}>
        <PageHeader leftContent={{ icon: ARROW_LEFT }} />

        <div className={styles.mainContent}>
          <p>{formatMessage({ id: `SELECT_NEW_ACCOUNT` })}</p>

          <section className={styles.setNew}>
            <label htmlFor="accountNum">
              <span>{formatMessage({ id: `SELECT_NEW_ACCOUNT` })}</span>
              <input
                id="accountNum"
                type="text"
                autoComplete="off"
                value={accountNum}
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_ACCOUNT` })}
                onChange={this.onChangeAccount}
              />
            </label>
            <label htmlFor="code">
              <span>邀请码</span>
              <input
                id="code"
                type="text"
                autoComplete="off"
                value={code}
                placeholder={'请输入DID邀请码'}
                onChange={this.onChangeCode}
              />
            </label>
            <img className={styles.nextStep} onClick={this.toNext} src={NEXT_STEP} alt="" />
          </section>
        </div>
      </div>
    );
  }
}

export default Index;
