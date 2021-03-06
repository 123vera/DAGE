import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../../components/common/Header';
import { Icons } from '../../../../assets';
import { connect } from 'dva';
import { REG } from '../../../../utils/constants';
import { Toast, Modal, Checkbox } from 'antd-mobile';
import { downFixed } from '../../../../utils/utils';
import { formatMessage } from 'umi-plugin-locale';
const CheckboxItem = Checkbox.CheckboxItem;
@connect(({ otcMining, globalModel }) => ({ otcMining, globalModel }))
class OtcMining extends Component {
  state = {
    isChecked: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'otcMining/OtcInit' });
  }

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

  render() {
    const { initInfo, count } = this.props.otcMining;

    return (
      <div className={styles.otcMining}>
        <header>
          <Header
            title={formatMessage({ id: `OTC_INLAND_TITLE` })}
            icon={Icons.arrowLeft}
            rightContent={{
              text: formatMessage({ id: `OTC_ABROAD_DOWNLOAD_PLUGIN` }),
              textStyle: { color: '#F3AF66', fontSize: '0.24rem' },
              onHandle: () => (window.location.href = 'http://d.6short.com/sngw'),
            }}
          />
        </header>
        <div className={styles.form}>
          <label className={styles.label}>
            {formatMessage({ id: `OTC_QUANTITY_SOLD` })}（DGT）
          </label>
          <input
            type="text"
            autoComplete="off"
            placeholder={`${formatMessage({ id: `OTC_SALE_CONDITIONS_01` })}${initInfo.amountMin}-${
              initInfo.amountMax
            }${formatMessage({ id: `OTC_SALE_CONDITIONS_02` })}`}
            value={count}
            onChange={e => this.onCountChange(e.target.value)}
          />
          <aside>
            <span>
              {formatMessage({ id: `OTC_ABROAD_USABLE` })}：{downFixed(initInfo.balance)}
              {/* {formatMessage({ id: `OTC_ABROAD_TRADE` })}
              {downFixed(initInfo.otcnum)} */}
            </span>
            <span>
              {formatMessage({ id: `OTC_ABROAD_USABLE_DID` })}：{downFixed(initInfo.didnum) || '--'}
              {/* {formatMessage({ id: `OTC_INLAND_FUEL_COSTS` })}0.1% DID   {/* 燃料费：0.1% DID */}
              {/* {formatMessage({ id: `OTC_ABROAD_USABLE` })}：{downFixed(initInfo.balance)} */}
            </span>
          </aside>
          <button onClick={this.onSubmit}>{formatMessage({ id: `OTC_CONFIRM_SALE` })}</button>
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
          <label className={styles.label}>{formatMessage({ id: `WITHDRAW_TIPS_TITLE` })}</label>
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
