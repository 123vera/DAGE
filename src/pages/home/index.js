import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { router } from 'umi';
import PageHeader from '../../components/common/PageHeader';
import { Images, Icons } from '../../assets';
import { formatMessage } from 'umi/locale';
import { downFixed } from '../../utils/utils';

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
                <img src={Icons.iconInvite} alt=""/>
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
              <img src={Icons.homeCurrency} alt="" />
              <span>{formatMessage({ id: `HOME_DIGITAL_CASH` })}</span>
              <small>USDT/BTC/ETH</small>
            </li>
            {isChinese ? (
              <li onClick={() => router.push('/wallet/dgt_recharge')}>
                <img src={Icons.homeDgt} alt="" />
                <span>{formatMessage({ id: `HOME_LEGAL_TENDER` })}</span>
                <small>{formatMessage({ id: `HOME_LEGAL_TENDER_DESC` })}</small>
              </li>
            ) : (
              <li onClick={() => router.push('/game')}>
                <img src={Icons.homeGame} alt="" />
                <span>{formatMessage({ id: `HOME_GAME_CENTER` })}</span>
                <small>{formatMessage({ id: `HOME_GAME_CENTER_DESC` })}</small>
              </li>
            )}
          </ul>
          {isChinese && (
            <div
              className={styles.gameCard}
              style={{ backgroundImage: `url(${Images.homeGameBg})` }}
              onClick={() => router.push('/game')}
            >
              <span>{formatMessage({ id: `HOME_GAME_CENTER` })}</span>
              <br />
              <small>{formatMessage({ id: `HOME_GAME_CENTER_DESC` })}</small>
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
    this.props.dispatch({ type: 'wallet/GetGameReward' });
  }

  render() {
    const { myInfo } = this.props.globalModel;
    const { certification, reward } = this.props.wallet;
    const isChinese = myInfo.phonePrefix === '86';

    return (
      <div className={styles.mining}>
        <h3>
          <img src={Icons.oIcon} alt="" />
          {formatMessage({ id: `HOME_MINING_POOL` })}
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
          <li onClick={() => router.push('/home/order-detail')}>
            <span>{formatMessage({ id: `HOME_OTC_MINING` })}</span>
            <span>{downFixed(reward.surplus)} USDT</span>

          </li>
          <li onClick={() => router.push('/promotion')}>
            <span>{formatMessage({ id: `HOME_OTC_TEAM_REVENUE` })}</span>
            <span>{downFixed(reward.yestodayTeamreward)} USDT</span>

          </li>
        </ul>
        <div className={styles.btnBox}>
          <button onClick={() => router.push('/home/buy-supporting')}>
            {formatMessage({ id: `BUY_TITLE` })}
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
