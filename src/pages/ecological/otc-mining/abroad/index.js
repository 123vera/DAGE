import React, { Component } from 'react';
import styles from './index.less';
import PageHeader from '../../../../components/common/PageHeader';
import { Icons } from '../../../../assets';
import { REG } from '../../../../utils/constants';
import { Toast } from 'antd-mobile';
import { downFixed } from '../../../../utils/utils';
import { connect } from 'dva';
import { router } from 'umi';
import { formatMessage, getLocale } from 'umi-plugin-locale';
import CoinSwitch from '../../../../components/wallet/CoinSwitch';

@connect(({ otcMining, globalModel }) => ({ otcMining, globalModel }))
class OtcMining extends Component {
  state = {
    isChecked: false,
    showMenus: false,
  };

  componentDidMount() {
    this.otcInit().then(res => {
      if (res.status === 1) {
        this.coinInit().then();
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'otcMining/UpdateState',
      payload: { count: '', initInfo: {} },
    });
  }

  otcInit = async () => {
    const {
      otcMining: { coin },
    } = this.props;

    return this.props.dispatch({
      type: 'otcMining/OtcInit',
      payload: {
        type: coin || '',
      },
    });
  };

  coinInit = async () => {
    const {
      dispatch,
      otcMining: { initInfo },
    } = this.props;

    const coins = initInfo.typeList || [];
    const coin = initInfo.type;
    const menus = coins.map(coin => ({
      label: coin,
      value: coin,
    }));
    await dispatch({
      type: 'otcMining/UpdateState',
      payload: { coin, menus },
    });
  };

  changeCoin = async menu => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'otcMining/UpdateState',
      payload: { coin: menu.value },
    });
    this.otcInit().then();
    this.setState({ showMenus: false });
  };


  onCountChange = value => {
    if (value && !REG.NUMBER.test(value)) {
      return;
    }
    this.props.dispatch({
      type: 'otcMining/UpdateState',
      payload: { count: value },
    });
  };

  onSubmit = () => {
    const { myInfo } = this.props.globalModel;
    const { count, initInfo } = this.props.otcMining;
    if (!count) {
      return Toast.info(formatMessage({ id: `OTC_PLACEHOLDER` }));
    }
    if (Number(count) > Number(myInfo.dgt)) {
      return Toast.info(formatMessage({ id: `TOAST_ERR_BALANCE_NOT_ENOUGH` }));
    }
    if (Number(count) < initInfo.amountMin || Number(count) > initInfo.amountMax) {
      return Toast.info(
        `${formatMessage({ id: `OTC_SALE_CONDITIONS_03` })}${initInfo.amountMin}-${
          initInfo.amountMax
        }${formatMessage({ id: `OTC_SALE_CONDITIONS_02` })}`,
      );
    }

    // if (Number(count) > 200) {
    //   Toast.info(formatMessage({ id: `OTC_TOAST_BLANCE` }));
    //   return;
    // }

    this.props.dispatch({ type: 'otcMining/OtcSubmit' }).then(res => {
      if (res.status !== 1) {
        res.msg && Toast.info(res.msg);
        return;
      }
      Toast.info(formatMessage({ id: `OTC_ABROAD_SALE_SUCCESS` }), 2, () =>
        window.location.reload(),
      );
    });
  };

  render() {
    const { initInfo, count, coin, menus } = this.props.otcMining;
    const { showMenus } = this.state;

    return (
      <div className={styles.otcMining}>
        <PageHeader
          title={formatMessage({ id: `OTC_ABROAD_TITLE` })}
          leftContent={{ icon: Icons.arrowLeft }}
          rightContent={{
            text: (
              <span style={{ color: '#F3AF66', fontSize: '0.24rem' }}>
                {formatMessage({ id: `OTC_MINING_DETAIL_TITLE` })}
              </span>
            ),
            onHandle: () => router.push('/mining-detail'),
          }}
        />

        <div className={styles.form}>
          <label className={styles.label}>
            {/* 挖矿量（USD） */}
            {formatMessage({ id: `OTC_MINING_AMOUNT` })}
          </label>
          <input
            type="text"
            autoComplete="off"
            placeholder={`${formatMessage({ id: `OTC_AMOUNT_PLACEHOLDER_01` })}${
              initInfo.amountMin
            }USD-${initInfo.amountMax}USD${formatMessage({ id: `OTC_SALE_CONDITIONS_02` })}`}
            value={count}
            onChange={e => this.onCountChange(e.target.value)}
          />
        </div>

        <div className={styles.form}>
          <label className={styles.label}>{formatMessage({ id: `OTC_PAY_COIN` })}</label>
          <CoinSwitch
            showMenus={showMenus}
            coin={coin}
            menus={menus}
            click={() => this.setState({ showMenus: !showMenus })}
            change={this.changeCoin}
          />
          <aside>
            <span>
              {/* {formatMessage({ id: `OTC_ABROAD_USABLE` })}：{downFixed(initInfo.balance)} */}
            </span>
            <span>
              {/* 可用{coin}: XXX */}
              {getLocale() === 'en-US'
                ? `${coin}${formatMessage({ id: `EXCHANGE_CAN_USE` })} ：${downFixed(
                    initInfo.balance,
                  )}`
                : formatMessage({ id: `EXCHANGE_CAN_USE` })}
              {coin}：{downFixed(initInfo.balance)}
            </span>
          </aside>
          <label className={styles.label}>
            {formatMessage({ id: `OTC_RATE` })}
            <span>
              {downFixed(initInfo.ratio, 4) || '--'} {coin}/USD
            </span>
          </label>
          <label className={styles.label}>
            {formatMessage({ id: `OTC_CONSUMPTION` })}
            <span>
              {downFixed(count * initInfo.ratio, 4) || '--'} {coin}
            </span>
          </label>

          <button onClick={this.onSubmit}>{formatMessage({ id: `OTC_CONFIRM_MINING` })}</button>
        </div>

        <div className={styles.reminder}>
          <label>{formatMessage({ id: `WITHDRAW_TIPS_TITLE` })}</label>
          <p>
            <small>{formatMessage({ id: `OTC_TIPS_01` })}</small>
          </p>
        </div>
      </div>
    );
  }
}

export default OtcMining;
