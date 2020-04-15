import React, { Component } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import { Icons } from '../../../assets';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ gameList }) => ({ gameList }))
class Index extends Component {
  render() {
    const {
      gameList: { list },
    } = this.props;

    return (
      <div id={styles.gameList}>
        <PageHeader title="棋牌" leftContent={{ icon: Icons.arrowWhiteLeft }} />

        <ul className={styles.contentWrapper}>
          {list.map((i, key) => (
            <li key={key.toString()}>
              <img src="" alt="" />
              <p className={styles.center}>
                <span>323</span>
                <span>NO.{key + 1}</span>
              </p>
              <p className={styles.right}>
                <span>类型：323</span>
                <span>平台：323</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Index;
