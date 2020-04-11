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
    this.props.dispatch({ type: 'wallet/AlipayInit' });
    this.props.dispatch({ type: 'wallet/OtcDetail' });
  }

  changeCurrency = currency => {
    this.props.dispatch({ type: 'wallet/UpdateState', payload: { currency } });
    this.setState({ showMenus: false });
  };

  render() {
    const { myInfo } = this.props.globalModel;
    const { currency, certification, reward } = this.props.wallet;
    const { showMenus } = this.state;
    const isMoreCurrency = currency.value === 'dgt+did';
    const isActivate = myInfo.activate === 1;
    const isChinese = myInfo.phonePrefix === '86';

    return (
      <div className={styles.mining}>
        <GroupTitle icon={Icons.oIcon} title={formatMessage({ id: `WALLET_POG_TITLE` })} />

        {!isActivate ? (
          <div className={styles.content}>
            {isChinese ? (
              <p>
                <span className={styles.left}>{formatMessage({ id: `HOME_SECTION_MAIN_01` })}</span>
                <span className={styles.certification}>
                  <Certification status={certification} />
                </span>
              </p>
            ) : (
              <p>{formatMessage({ id: `HOME_SECTION_MAIN_02` })}</p>
            )}
          </div>
        ) : (
          <div className={styles.content}>
            <p>{formatMessage({ id: `HOME_SECTION_MAIN_03` })}</p>
            <div className={styles.miningSummary}>
              <span>
                {downFixed(reward.dgc)} <i>DGT</i>
                <span>+</span>
                {downFixed(reward.did)} <i>DID</i>
              </span>
              <Link to="/mining-detail/otc">{formatMessage({ id: `HOME_SECTION_MAIN_04` })}</Link>
            </div>
          </div>
        )}
        <div className={styles.btnBox}>
          <button
            onClick={() =>
              isChinese ? router.push('/otc-mining/inland') : router.push('/otc-mining/abroad')
            }
          >
            {formatMessage({ id: `WALLET_POG_BTN` })}
          </button>
        </div>

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

function Certification({ status }) {
  switch (status) {
    case 0:
      return <span>{formatMessage({ id: `RECORD_AUDIT` })}</span>;
    case 1:
      return <span>{formatMessage({ id: `HOME_SECTION_MAIN_07` })}</span>;
    case -1:
      return (
        <span onClick={() => router.push('/alipay')}>
          {formatMessage({ id: `HOME_SECTION_MAIN_05` })}
        </span>
      );
    case -2:
      return (
        <span onClick={() => router.push('/alipay')}>
          {formatMessage({ id: `HOME_SECTION_MAIN_06` })}
        </span>
      );
    default:
      return <span> </span>;
  }
}
