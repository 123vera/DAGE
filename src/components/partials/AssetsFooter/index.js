import React, { Component } from 'react';
import styles from './index.less';
import ICON_RECHARGE from '../../../assets/icons/icon-recharge.png';
import ICON_WITHDRAW from '../../../assets/icons/icon-withdraw.png';
import ICON_PART from '../../../assets/icons/icon-part.png';
import ICON_TRANSFER from '../../../assets/icons/icon-transfer.png';
import { formatMessage } from 'umi-plugin-locale';
import { router } from 'umi';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';

@connect(({ globalModel }) => ({ globalModel }))
class Index extends Component {
  state = {
    coinJump: {},
  };

  componentDidMount() {
    const { myInfo } = this.props.globalModel;
    const coinJump = {
      USDT: [
        {
          img: ICON_RECHARGE,
          value: 'recharge',
          label: formatMessage({ id: `ASSETS_RECHANGE` }),
          path: '/wallet/recharge?type=USDT',
        },
        {
          img: ICON_WITHDRAW,
          value: 'withdraw',
          label: formatMessage({ id: `ASSETS_WITHDRAW` }),
          path: `/wallet/withdraw?type=USDT`,
        },
      ],
      DGT: [
        {
          img: ICON_RECHARGE,
          value: 'recharge',
          label: formatMessage({ id: `ASSETS_RECHANGE` }),
          path: '/wallet/recharge?type=DGT',
        },
        {
          img: ICON_WITHDRAW,
          value: 'withdraw',
          label: formatMessage({ id: `ASSETS_WITHDRAW` }),
          path: `/wallet/withdraw?type=DGT`,
        },
        {
          img: ICON_TRANSFER,
          value: 'transfer',
          label: formatMessage({ id: `ASSETS_TRANSFER` }),
          path: '',
        },
        {
          img: ICON_PART,
          value: 'mining',
          label: formatMessage({ id: `WALLET_POG_BTN` }),
          path: `/otc-mining/${myInfo.phonePrefix === '86' ? 'inland' : 'abroad'}`,
        },
      ],
      DID: [
        {
          img: ICON_RECHARGE,
          value: 'recharge',
          label: formatMessage({ id: `ASSETS_RECHANGE` }),
          path: '/wallet/recharge?type=DID',
        },
        {
          img: ICON_WITHDRAW,
          value: 'withdraw',
          label: formatMessage({ id: `ASSETS_WITHDRAW` }),
          path: `/wallet/withdraw?type=DID`,
        },
      ],
      DGC: [
        {
          img: ICON_RECHARGE,
          value: 'recharge',
          label: formatMessage({ id: `ASSETS_RECHANGE` }),
          path: '/wallet/recharge?type=DGC',
        },
        {
          img: ICON_WITHDRAW,
          value: 'withdraw',
          label: formatMessage({ id: `ASSETS_WITHDRAW` }),
          path: `/wallet/withdraw?type=DGC`,
        },
      ],
      OTC: [
        {
          img: ICON_RECHARGE,
          value: 'exchange',
          label: formatMessage({ id: `ASSETS_RECHANGE` }),
          path: '/exchange',
        },
      ],
      RC: [
        {
          img: ICON_RECHARGE,
          value: 'recharge',
          label: formatMessage({ id: `ASSETS_RECHANGE` }),
          path: '/wallet/recharge?type=RC',
        },
        {
          img: ICON_WITHDRAW,
          value: 'withdraw',
          label: formatMessage({ id: `ASSETS_WITHDRAW` }),
          path: `/wallet/withdraw?type=RC`,
        },
        {
          img: ICON_TRANSFER,
          value: 'transfer',
          label: formatMessage({ id: `ASSETS_TRANSFER` }),
          path: '',
        },
      ],
    };
    this.removeRechargeItem(coinJump).then(coinJump => this.setState({ coinJump }));
  }

  removeRechargeItem = async (coinJump) => {
    const { dispatch } = this.props;
    const coins = await dispatch({
      type: 'globalModel/GetCurrencyList',
    });
    Object.keys(coinJump).forEach(key => {
      if (!coins.includes(key)) {
        coinJump[key] = coinJump[key].filter(i => i.value !== 'recharge' && i.value !== 'withdraw');
      }
    });
    return coinJump;
  };

  jumpTo = path => {
    if (!path) {
      Toast.info(formatMessage({ id: `WALLET_COMING_SOON` }));
      return;
    }
    router.push(path);
  };

  render() {
    const { type } = this.props;
    const jumps = this.state.coinJump[type] || [];

    console.log('type', type);
    return (
      <section id={styles.assetsFooter}>
        {jumps.map(jump => (
          <div key={jump.label}>
            <p onClick={() => this.jumpTo(jump.path)}>
              <img src={jump.img} alt=""/>
            </p>
            {jump.label}
          </div>
        ))}
        {/* 下方按钮 DGT有4种，RC有三种(充币、提币、划转)，其他币种均为2种（充值提币） */}
        {/*<div>*/}
        {/*<p onClick={() => router.push('/wallet/recharge')}>*/}
        {/*<img src={ICON_RECHARGE} alt=""/>*/}
        {/*</p>*/}
        {/*{formatMessage({ id: `WALLET_RECHARGE` })}*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<p onClick={() => router.push(`/wallet/withdraw?type=${type}`)}>*/}
        {/*<img src={ICON_WITHDRAW} alt=""/>*/}
        {/*</p>*/}
        {/*{formatMessage({ id: `WALLET_WITHDRAW` })}*/}
        {/*</div>*/}
        {/*{(type === 'DGT' || type === 'RC') && (*/}
        {/*<div>*/}
        {/*<p onClick={() => Toast.info(formatMessage({ id: `WALLET_COMING_SOON` }))}>*/}
        {/*<img src={ICON_TRANSFER} alt=""/>*/}
        {/*</p>*/}
        {/*{formatMessage({ id: `ASSETS_TRANSFER` })}*/}
        {/*</div>*/}
        {/*)}*/}
        {/*{type === 'DGT' && (*/}
        {/*<div>*/}
        {/*<p*/}
        {/*onClick={() =>*/}
        {/*router.push(`/otc-mining/${myInfo.phonePrefix === '86' ? 'inland' : 'abroad'}`)*/}
        {/*}*/}
        {/*>*/}
        {/*<img src={ICON_PART} alt=""/>*/}
        {/*</p>*/}
        {/*{formatMessage({ id: `WALLET_POG_BTN` })}*/}
        {/*</div>*/}
        {/*)}*/}
      </section>
    );
  }
}

export default Index;
