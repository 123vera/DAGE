import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeader from '@/components/common/PageHeader';
import CURRENCY from '@/assets/icons/currency.png';
import GAME from '@/assets/icons/game.png';
import OTC_MINING from '@/assets/icons/otc-mining.png';
import OTC_MINING_DETAIL from '@/assets/icons/otc-mining-detail.png';
import DEP from '@/assets/icons/dep.png';
import styles from './index.less';
import { router } from 'umi';
import { Icons } from '../../../assets';
import { formatMessage } from 'umi/locale';
import { Toast } from 'antd-mobile';

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
  },
  {
    img: OTC_MINING,
    title: formatMessage({ id: `ECOLOGICAL_CURRENCY_TITLE_03` }),
    subTitle: formatMessage({ id: `ECOLOGICAL_CURRENCY_SUBTITLE_03` }),
    link: '',
  },
  {
    img: OTC_MINING_DETAIL,
    title: formatMessage({ id: `ECOLOGICAL_CURRENCY_TITLE_04` }),
    subTitle: formatMessage({ id: `ECOLOGICAL_CURRENCY_SUBTITLE_04` }),
    link: '',
  },
  {
    img: DEP,
    title: formatMessage({ id: `ECOLOGICAL_CURRENCY_TITLE_05` }),
    subTitle: formatMessage({ id: `ECOLOGICAL_CURRENCY_SUBTITLE_05` }),
    link: '',
  },
];
@connect(({ ecological }) => ({ ecological }))
class Index extends Component {
  routerHref = link => {
    if (link) {
      router.push(link);
    } else {
      Toast.info(formatMessage({ id: `WALLET_COMING_SOON` }), 0.9);
    }
  };

  render() {
    return (
      <div id={styles.ecological}>
        <PageHeader title={formatMessage({ id: `ECOLOGICAL_TITLE` })} />

        <ul className={styles.contents}>
          {list.map((item, key) => (
            <li onClick={() => this.routerHref(item.link)} key={key}>
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
