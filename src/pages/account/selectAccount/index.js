import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import PageHeader from '@/components/common/PageHeader';
import UNCHECKED_IMG from '@/assets/dark/unchecked.png';
import CHECKED_IMG from '@/assets/dark/checked.png';
import ADD_IMG from '@/assets/dark/add.png';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import NEXT_STEP from '@/assets/dark/next-step.png';
import styles from './index.less';
import router from 'umi/router';
import { connect } from 'dva';

@connect(({ selectAccount }) => ({ selectAccount }))
class Index extends Component {
  state = {
    checkedIndex: 0,
    accountList: [],
  };

  checkedAccount = index => {
    this.setState({ checkedIndex: index });
  };

  addAccount = () => {
    router.push('/set_account');
  };
  toNext = () => {
    const { accountList, checkedIndex } = this.state;
    const { dispatch } = this.props;
    if (accountList.length < 1) return;
    dispatch({ accountNum: accountList[checkedIndex] });
    router.push('/');
  };

  render() {
    const { checkedIndex } = this.state;
    const accountList = [2323, 32323, 5454];
    return (
      <div id={styles.selectAccount}>
        <PageHeader leftContent={{ icon: ARROW_LEFT }} />

        <div className={styles.mainContent}>
          <p>{formatMessage({ id: `SELECT_ACCOUNT_TITLE` })}</p>
          <div className={styles.sectionWrap}>
            {accountList.map((item, key) => (
              <section key={key.toString()} onClick={() => this.checkedAccount(key)}>
                <span className={checkedIndex === key ? '' : styles.unChecked}>{item}</span>
                <img src={checkedIndex === key ? CHECKED_IMG : UNCHECKED_IMG} alt="" />
              </section>
            ))}

            {accountList.length < 5 && (
              <section className={styles.setNew} onClick={() => router.push('/set_account')}>
                {formatMessage({ id: `SELECT_NEW_ACCOUNT` })}
                <img src={ADD_IMG} onClick={this.addAccount} alt="ADD_IMG" />
              </section>
            )}
          </div>
          <img onClick={this.toNext} className={styles.nextStep} src={NEXT_STEP} alt="" />
        </div>
      </div>
    );
  }
}

export default Index;
