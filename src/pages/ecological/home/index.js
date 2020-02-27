import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeader from '@/components/common/PageHeader';
import CURRENCY from '@/assets/icons/currency.png';
import GAME from '@/assets/icons/game.png';
import ARROW_RIGHT from '@/assets/icons/arrow-right.png';
import styles from './index.less';
import { router } from 'umi';

const list = [
  {
    img: CURRENCY,
    title: '去中心化交易所',
    subTitle: '基于智能合约的币币兑换交易所',
    link: '/exchange',
  },
  {
    img: GAME,
    title: '游戏平台',
    subTitle: '基于去中心化游戏',
    link: '',
  },
];
@connect(({ ecological }) => ({ ecological }))
class Index extends Component {
  render() {
    return (
      <div id={styles.ecological}>
        <PageHeader title="生态" />

        <ul className={styles.contents}>
          {list.map((item, key) => (
            <li onClick={() => router.push(item.link)} key={key}>
              <img src={item.img} alt="" />
              <div className={styles.text}>
                <span>{item.title}</span>
                <span>{item.subTitle}</span>
              </div>
              <img className={styles.arrowRight} src={ARROW_RIGHT} alt="ARROW_RIGHT" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Index;
