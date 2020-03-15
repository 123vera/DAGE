import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeader from '@/components/common/PageHeader';
import CURRENCY from '@/assets/icons/currency.png';
import GAME from '@/assets/icons/game.png';
import styles from './index.less';
import { router } from 'umi';
import { Icons } from '../../../assets';
import { formatMessage } from 'umi/locale';

const list = [
  {
    img: CURRENCY,
    title: formatMessage({ id: `ECOLOGICAL_CURRENCY_TITLE_01` }),
    subTitle: formatMessage({ id: `ECOLOGICAL_CURRENCY_SUBTITLE_01` }),
    link: '/exchange',
  },
  {
    img: GAME,
    title: formatMessage({ id: `ECOLOGICAL_CURRENCY_TITLE_02` }),
    subTitle: formatMessage({ id: `ECOLOGICAL_CURRENCY_SUBTITLE_02` }),
    link: '',
  },{
    img: GAME,
    title: 'OTC挖矿',
    subTitle: '简单快捷，一键出金',
    link: '',
  },{
    img: GAME,
    title: 'POG',
    subTitle: '实时查看挖矿详情',
    link: '',
  },{
    img: GAME,
    title: '合成DEP',
    subTitle: '合成DEP快速开启POG挖矿',
    link: '',
  },
];
@connect(({ ecological }) => ({ ecological }))
class Index extends Component {
  render() {
    return (
      <div id={styles.ecological}>
        <PageHeader title={formatMessage({ id: `ECOLOGICAL_TITLE` })} />

        <ul className={styles.contents}>
          {list.map((item, key) => (
            <li onClick={() => router.push(item.link)} key={key}>
              <img src={item.img} alt="" />
              <div className={styles.text}>
                <span>{item.title}</span>
                <span>{item.subTitle}</span>
              </div>
              <img className={styles.arrowRight} src={Icons.arrowRight} alt="ARROW_RIGHT" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Index;
