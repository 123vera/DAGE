import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import PageHeader from '@/components/common/PageHeader';
import UNCHECKED_IMG from '@/assets/dark/unchecked.png';
import CHECKED_IMG from '@/assets/dark/checked.png';
import ADD_IMG from '@/assets/dark/add.png';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import styles from './index.less';
import router from 'umi/router';

class Index extends Component {
  state = {
    checkedIndex: 0,
    accountList: [],
  };

  checkedAccount = index => {
    this.setState({ checkedIndex: index });
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
                <span>{item}</span>
                <img src={checkedIndex === key ? CHECKED_IMG : UNCHECKED_IMG} alt="" />
              </section>
            ))}

            <section className={styles.setNew} onClick={() => router.push('/set_account')}>
              {formatMessage({ id: `SELECT_NEW_ACCOUNT` })}
              <img src={ADD_IMG} alt="" />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
