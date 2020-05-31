import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeader from '../../components/common/PageHeader';
import styles from './index.less';
import { router } from 'umi';
import { Icons, Images } from '../../assets';
import { formatMessage } from 'umi/locale';
import { Toast } from 'antd-mobile';

@connect(({ ecology, globalModel }) => ({ ecology, globalModel }))
class Index extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'globalModel/GetMyInfo' }).then(() => {
      const { myInfo } = this.props.globalModel;
      const otcLink =
        myInfo.phonePrefix && myInfo.phonePrefix.includes('86')
          ? '/otc-mining/inland'
          : '/otc-mining/abroad';
      const list = [
        {
          img: Images.ecoCurrency,
          title: formatMessage({ id: `REDEEM_NOW_TITLE` }),
          subTitle: formatMessage({ id: `ECOLOGICAL_CURRENCY_SUBTITLE_01` }),
          link: '/exchange',
        },
        {
          img: Images.ecoOtcMining,
          // title: formatMessage({ id: `ECOLOGICAL_CURRENCY_TITLE_03` }),
          title: 'gambit游戏钱包',
          subTitle: formatMessage({ id: `ECOLOGICAL_CURRENCY_SUBTITLE_03` }),
          link: otcLink,
        },
        {
          img: Images.ecoGame,
          title: formatMessage({ id: `ECOLOGICAL_CURRENCY_TITLE_02` }),
          subTitle: formatMessage({ id: `ECOLOGICAL_CURRENCY_SUBTITLE_02` }),
          link: '/game',
        },
        {
          img: Images.ecoDep,
          title: '鸭鸭直播',
          subTitle: formatMessage({ id: `ECOLOGICAL_CURRENCY_SUBTITLE_06` }),
          link: '',
        },
        {
          img: Images.ecoPoker,
          title: '德州扑克',
          subTitle: 'DAGE德州扑克平台',
          link: '',
        },
      ];
      this.setState({ list });
    });
  }

  routerHref = link => {
    if (link) {
      router.push(link);
    } else {
      Toast.info(formatMessage({ id: `WALLET_COMING_SOON` }), 0.9);
    }
  };

  render() {
    const { list } = this.state;

    return (
      <div id={styles.ecology}>
        <PageHeader title={formatMessage({ id: `ECOLOGICAL_TITLE` })} />

        <ul className={styles.contents}>
          {list.map((item, key) => (
            <li onClick={() => this.routerHref(item.link)} key={key}>
              <img className={styles.left} src={item.img} alt="" />
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
