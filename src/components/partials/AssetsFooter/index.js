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
    coinJumps: [],
  };

  componentDidMount() {
    const { myInfo } = this.props.globalModel;
    const { type } = this.props;
    const recharge = {
      img: ICON_RECHARGE,
      value: 'recharge',
      label: formatMessage({ id: `ASSETS_RECHANGE` }),
      path: `/wallet/recharge?type=${type}`,
    };
    const withdraw = {
      img: ICON_WITHDRAW,
      value: 'withdraw',
      label: formatMessage({ id: `ASSETS_WITHDRAW` }),
      path: `/wallet/withdraw?type=${type}`,
    };
    const transfer = {
      img: ICON_TRANSFER,
      value: 'transfer',
      label: formatMessage({ id: `ASSETS_TRANSFER` }),
      path: '/assets/transfer',
    };
    const mining = {
      img: ICON_PART,
      value: 'mining',
      label: formatMessage({ id: `WALLET_POG_BTN` }),
      path: `/otc-mining/${myInfo.phonePrefix === '86' ? 'inland' : 'abroad'}`,
    };
    if (type === 'RC') {
      return this.setState({ coinJumps: [transfer] });
    }
    if (type === 'DGT') {
      return this.setState({ coinJumps: [recharge, withdraw, transfer, mining] });

    }
    return this.setState({ coinJumps: [recharge, withdraw, mining] });
  }

  jumpTo = path => {
    if (!path) {
      Toast.info(formatMessage({ id: `WALLET_COMING_SOON` }));
      return;
    }
    router.push(path);
  };

  render() {
    const { coinJumps } = this.state;

    return (
      <section id={styles.assetsFooter}>
        {coinJumps.map(jump => (
          <div key={jump.label}>
            <p onClick={() => this.jumpTo(jump.path)}>
              <img src={jump.img} alt=""/>
            </p>
            {jump.label}
          </div>
        ))}
      </section>
    );
  }
}

export default Index;
