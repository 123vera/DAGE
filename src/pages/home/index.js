import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { router } from 'umi';
import PageHeader from '../../components/common/PageHeader';
import {Images, Icons } from '../../assets';
import { formatMessage } from 'umi/locale';

@connect(({ wallet, globalModel }) => ({ wallet, globalModel }))
class Home extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'wallet/GetNotice' });
  }

  render() {
    const { myInfo } = this.props.globalModel;
    const { notice } = this.props.wallet;
    const isChinese = myInfo.phonePrefix === '86';

    return (
      <div className={styles.home} onClick={() => this.setState({ showMenus: false })}>
        <PageHeader
          title={formatMessage({ id: `WALLET_HOME` })}
          rightContent={{
            text: (
              <span>
                <img src={Icons.iconInvite} alt="" />
              </span>
            ),
            onHandle: () => router.push('/referral_code'),
          }}
          leftContent={{
            icon: Icons.list,
            onHandle: () => router.push('/select_account'),
          }}
        />
        <section className={styles.cards}>
          <ul className={!isChinese ? styles.foreigner : ''}>
            <li onClick={() => router.push('/wallet/recharge')}>
              <img src={Icons.dIcon} alt="" />
              <span>数字货币</span>
              <small>USDT/BTC/ETH</small>
            </li>
            {isChinese ? (
              <li onClick={() => router.push('/wallet/dgt_recharge')}>
                <img src={Icons.dIcon} alt="" />
                <span>法币充值</span>
                <small>银行卡/境内支付宝</small>
              </li>
            ) : (
              <li onClick={() => router.push('/wallet/game')}>
                <img src={Icons.dIcon} alt="" />
                <span>游戏中心</span>
                <small>基于去中心化的游戏中心</small>
              </li>
            )}
          </ul>
          {isChinese && (
            <div className={styles.gameCard}
                 style={{backgroundImage: `url(${Images.homeGameBg})`}}
                 onClick={() => router.push('/game')}>
              <span>游戏中心</span>
              <br />
              <small>基于去中心化的游戏中心</small>
            </div>
          )}
        </section>
        <section>
          <div className={styles.notice} onClick={() => router.push('/notices')}>
            <p>
              {formatMessage({ id: `NOTICE` })}：{notice && notice.title}
            </p>
          </div>
        </section>
        <Mining myInfo={myInfo} />
      </div>
    );
  }
}

export default Home;


@connect(({ wallet, globalModel }) => ({ wallet, globalModel }))
class Mining extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'wallet/AlipayInit' });
    this.props.dispatch({ type: 'wallet/OtcDetail' });
  }

  render() {
    const { myInfo } = this.props.globalModel;
    const { certification } = this.props.wallet;
    const isChinese = myInfo.phonePrefix === '86';

    return (
      <div className={styles.mining}>
        <h3>
          <img src={Icons.oIcon} alt="" />
          {'游戏矿池'}
        </h3>
        {!isChinese && (
          <p className={styles.alipay}>
            <span className={styles.left}>{formatMessage({ id: `HOME_SECTION_MAIN_01` })}</span>
            <span className={styles.certification}>
              <Certification status={certification} />
            </span>
          </p>
        )}
        <ul>
          <li onClick={() => router.push('/mining-detail/otc')}>
            <span>正在挖矿</span>
            <span>7282.33USD</span>
          </li>
          <li onClick={() => router.push('/promotion')}>
            <span>昨日团队收益</span>
            <span>7272.33USD</span>
          </li>
        </ul>
        <div className={styles.btnBox}>
          <button
            onClick={() =>
              isChinese ? router.push('/otc-mining/inland') : router.push('/otc-mining/abroad')
            }
          >
            {'购买配套'}
          </button>
        </div>
      </div>
    );
  }
}

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
