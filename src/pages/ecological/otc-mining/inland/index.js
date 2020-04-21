import React, { Component } from 'react';
import styles from './index.less';
import PageHeader from '../../../../components/common/PageHeader';
import { Icons } from '../../../../assets';
import { connect } from 'dva';
import { REG } from '../../../../utils/constants';
import { Toast, Modal, Checkbox } from 'antd-mobile';
import { downFixed } from '../../../../utils/utils';
import { formatMessage } from 'umi-plugin-locale';
import { router } from 'umi';
import CoinSwitch from '../../../../components/wallet/CoinSwitch';

const CheckboxItem = Checkbox.CheckboxItem;
@connect(({ otcMining, globalModel }) => ({ otcMining, globalModel }))
class OtcMining extends Component {
  state = {
    isChecked: false,
    showMenus: false,
  };

  componentDidMount() {
    this.coinIni();
    this.props.dispatch({ type: 'otcMining/OtcInit' });
  }

  coinIni = async () => {
    const { dispatch, location, globalModel } = this.props;
    const { type = '' } = location.query;

    const coins =
      (await dispatch({
        type: 'globalModel/GetCurrencyList',
        payload: {},
      })) || [];
    const coin = type || coins[0];
    const menus = coins.map(coin => ({
      label: coin,
      value: coin,
    }));
    await dispatch({
      type: 'otcMining/UpdateState',
      payload: { coin, menus },
    });
  };

  componentWillUnmount() {
    this.props.dispatch({
      type: 'otcMining/UpdateState',
      payload: { count: '', initInfo: {} },
    });
  }

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

    if (!this.state.isChecked) {
      return Toast.info(formatMessage({ id: `OTC_INLAND_CHECKBOX` }));
    }

    Modal.alert(
      '',
      <span style={{ lineHeight: '1.3', textAlign: 'left', fontSize: '0.32rem', color: '#000' }}>
        {formatMessage({ id: `OTC_INLAND_SALE_01` })}
        {count || '--'} DGT{formatMessage({ id: `OTC_INLAND_SALE_02` })}
        {count * 0.001 || '--'} DID
        {formatMessage({ id: `OTC_INLAND_SALE_03` })}
      </span>,
      [
        {
          text: formatMessage({ id: `COMMON_CONFIRM` }),
          style: { fontSize: '0.32rem' },
          onPress: () => {
            this.props.dispatch({ type: 'otcMining/OtcSubmit' }).then(res => {
              if (res && res.status === 1) {
                Toast.info(formatMessage({ id: `OTC_ABROAD_SALE_SUCCESS` }), 2, () =>
                  window.location.reload(),
                );
              } else {
                res.msg && Toast.info(res.msg);
              }
            });
          },
        },
        { text: formatMessage({ id: `COMMON_CANCEL` }), style: { fontSize: '0.32rem' } },
      ],
    );
  };

  changeCoin = menu => {
    const { dispatch } = this.props;
    dispatch({
      type: 'otcMining/UpdateState',
      payload: { coin: menu.value },
    });

    this.setState({ showMenus: false });
  };

  render() {
    const { initInfo, count, coin, menus } = this.props.otcMining;
    const { showMenus } = this.state;
    console.log(this.props);
    return (
      <div className={styles.otcMining}>
        <PageHeader
          title={formatMessage({ id: `OTC_INLAND_TITLE` })}
          leftContent={{ icon: Icons.arrowLeft }}
          rightContent={{
            text: '挖矿详情',
            // text: formatMessage({ id: `OTC_ABROAD_DOWNLOAD_PLUGIN` }),
            textStyle: { color: '#F3AF66', fontSize: '0.24rem' },
            onHandle: () => router.push('/mining-detail'),
            // onHandle: () => (window.location.href = 'http://d.6short.com/sngw'),
          }}
        />

        <div className={styles.form}>
          <label className={styles.label}>
            挖矿量（USD）
            {/* {formatMessage({ id: `OTC_QUANTITY_SOLD` })}（DGT） */}
          </label>
          <input
            type="text"
            autoComplete="off"
            placeholder={`单笔挖矿数量需在${initInfo.amountMin}USD-${
              initInfo.amountMax
            }USD${formatMessage({ id: `OTC_SALE_CONDITIONS_02` })}`}
            value={count}
            onChange={e => this.onCountChange(e.target.value)}
          />
        </div>
        <div className={styles.form}>
          <label className={styles.label}>支付方式 </label>
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
              可用{coin}: XXX
              {/* {formatMessage({ id: `OTC_ABROAD_USABLE_DID` })}： */}
              {/* {downFixed(initInfo.didnum) || '--'} */}
            </span>
          </aside>
          <label className={styles.label}>
            当前汇率 <span>3333 {coin}/USD</span>
          </label>
          <label className={styles.label}>
            预计消耗 <span>3333.4 {coin}</span>
          </label>

          <button onClick={this.onSubmit}>{formatMessage({ id: `OTC_CONFIRM_MINING` })}</button>
        </div>

        <div className={styles.checkboxGroup}>
          <label>
            <CheckboxItem
              key={this.state.isChecked}
              checked={this.state.isChecked}
              onChange={e => {
                this.setState({ isChecked: e.target.checked });
              }}
            >
              {formatMessage({ id: `OTC_INLAND_CHECKBOX` })}
            </CheckboxItem>
          </label>
        </div>
        <div className={styles.reminder}>
          <label>{formatMessage({ id: `WITHDRAW_TIPS_TITLE` })}</label>
          <p>
            <small>{formatMessage({ id: `OTC_INLAND_SALE_TIPS_01` })}</small>
          </p>
          <p>
            <small>{formatMessage({ id: `OTC_INLAND_SALE_TIPS_02` })}</small>
          </p>
          <p>
            <small>{formatMessage({ id: `OTC_INLAND_SALE_TIPS_03` })}</small>
          </p>
          <p>
            <small>{formatMessage({ id: `OTC_INLAND_SALE_TIPS_04` })}</small>
          </p>
          <p>
            <small>{formatMessage({ id: `OTC_INLAND_SALE_TIPS_05` })}</small>
          </p>
        </div>
      </div>
    );
  }
}

export default OtcMining;
