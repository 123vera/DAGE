import { Component } from 'react';
import { Link } from 'umi';
import styles from './index.less';
import React from 'react';
import { connect } from 'dva';
import { Icons, Images } from '../../../assets';
import { formatMessage } from 'umi-plugin-locale';
import { downFixed } from '../../../utils/utils';
import Menus from '../../common/Menus';
import { router } from 'umi';
import GroupTitle from '../GroupTitle';

const menus = [
  {
    value: 'did',
    label: 'DID',
  },
  {
    value: 'dgt',
    label: 'DGT',
  },
  {
    value: 'dgt+did',
    label: 'DGT+DID',
  },
  {
    value: 'dep',
    label: 'DEP',
  },
];

@connect(({ wallet, globalModel }) => ({ wallet, globalModel }))
class Mining extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    const currency = menus[0];
    this.props.dispatch({ type: 'wallet/UpdateState', payload: { currency } });
  }

  changeCurrency = currency => {
    this.props.dispatch({ type: 'wallet/UpdateState', payload: { currency } });
    this.setState({ showMenus: false });
  };

  render() {
    const { myInfo } = this.props.globalModel;
    const { currency } = this.props.wallet;
    const { showMenus } = this.state;
    const isMoreCurrency = currency.value === 'dgt+did';

    return (
      <div className={styles.mining}>
        <section>
          <GroupTitle
            icon={Icons.oIcon}
            title={formatMessage({ id: `WALLET_POG_TITLE` })}
          />
          <p>{formatMessage({ id: `WALLET_POG_DESC_01` })}</p>
        </section>

        <section className={styles.openingSoon}>
          <button
            onClick={() => {
              myInfo.phonePrefix === '86'
                ? router.push('/otc-mining/inland')
                : router.push('/otc-mining/abroad');
            }}
          >
            {formatMessage({ id: `WALLET_POG_BTN` })}
          </button>
          {/* 2.0版本先不展示即将开放 */}
          {/* <h4>{formatMessage({ id: `WALLET_COMING_SOON` })}</h4> */}
        </section>

        {/*购买矿机 未开放*/}
        <section className={styles.buy}>
          <div className={styles.form}>
            <div className={styles.row}>
              <label>{formatMessage({ id: `WALLET_HOW_TO_BUY` })}</label>
              <div
                className={styles.inputBox}
                onClick={() => this.setState({ showMenus: !showMenus })}
              >
                <input
                  type="text"
                  autoComplete="off"
                  value={currency.label || ''}
                  readOnly={true}
                  // placeholder={formatMessage({ id: `WITHDRAW_PLACEHOLDER` })}
                />
                <button>
                  <img src={Icons.arrowDown} alt="" />
                </button>

                {showMenus && (
                  <div className={styles.menus}>
                    <Menus
                      menus={menus}
                      hasBorder
                      textAlign="center"
                      onHandle={this.changeCurrency}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <label>{formatMessage({ id: `WALLET_HOW_TO_BUY` })}</label>
              {!isMoreCurrency ? (
                <div className={styles.inputBox}>
                  <input
                    type="text"
                    autoComplete="off"
                    // value={walletTo}
                    placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_BUY_AMOUNT` })}
                    onChange={e => this.onWalletChange(e.target.value)}
                  />
                </div>
              ) : (
                <div className={styles.twoInputBox}>
                  <div className={styles.inputBox}>
                    <input
                      type="text"
                      autoComplete="off"
                      // value={walletTo}
                      onChange={e => this.onWalletChange(e.target.value)}
                    />
                    <button>DGT</button>
                  </div>
                  <span>+</span>
                  <div className={styles.inputBox}>
                    <input
                      type="text"
                      autoComplete="off"
                      // value={walletTo}
                      onChange={e => this.onWalletChange(e.target.value)}
                    />
                    <button>DID</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button className={styles.submit}>{formatMessage({ id: `WALLET_BUY` })}</button>
        </section>

        {/*挖矿详情 未开放*/}
        <section className={styles.detail}>
          <div className={styles.title}>
            <p>今日购买矿机总价值</p>
          </div>
          <div className={styles.price}>
            <span>
              267 <i>DGT</i>
            </span>
          </div>
          <aside>预计返还时间：2020.03.02 18:00:00</aside>
        </section>
      </div>
    );
  }
}

export default Mining;
