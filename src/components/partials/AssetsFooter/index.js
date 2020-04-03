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
  render() {
    const {
      type,
      globalModel: { myInfo },
    } = this.props;

    console.log('type', type);
    return (
      <section id={styles.assetsFooter}>
        {/* 下方按钮 DGT有4种，RC有三种(充值、提现、划转)，其他币种均为2种（充值提币） */}
        <div>
          <p onClick={() => router.push('/wallet/recharge')}>
            <img src={ICON_RECHARGE} alt="" />
          </p>
          {formatMessage({ id: `WALLET_RECHARGE` })}
        </div>
        <div>
          <p onClick={() => router.push(`/wallet/withdraw?type=${type}`)}>
            <img src={ICON_WITHDRAW} alt="" />
          </p>
          {formatMessage({ id: `WALLET_WITHDRAW` })}
        </div>
        {(type === 'DGT' || type === 'RC') && (
          <div>
            <p onClick={() => Toast.info(formatMessage({ id: `WALLET_COMING_SOON` }))}>
              <img src={ICON_TRANSFER} alt="" />
            </p>
            {formatMessage({ id: `ASSETS_TRANSFER` })}
          </div>
        )}
        {type === 'DGT' && (
          <div>
            <p
              onClick={() =>
                router.push(`/otc-mining/${myInfo.phonePrefix === '86' ? 'inland' : 'abroad'}`)
              }
            >
              <img src={ICON_PART} alt="" />
            </p>
            {formatMessage({ id: `WALLET_POG_BTN` })}
          </div>
        )}
      </section>
    );
  }
}

export default Index;
