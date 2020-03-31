import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../../components/common/Header';
import { Icons } from '../../../../assets';
import { connect } from 'dva';
import { REG } from '../../../../utils/constants';
import { Toast } from 'antd-mobile';
import { downFixed } from '../../../../utils/utils';
import { formatMessage } from 'umi-plugin-locale';

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

    // if (Number(count) > 200) {
    //   return Toast.info(formatMessage({ id: `OTC_TOAST_BLANCE` }));
    // }

    this.props.dispatch({ type: 'otcMining/OtcSubmit' }).then(res => {
      if (res.status !== 1) {
        return Toast.info(res.msg);
      }
      Toast.info(formatMessage({ id: `OTC_ABROAD_SALE_SUCCESS` }), 2, () =>
        window.location.reload(),
      );
    });
  };

  render() {
    const { initInfo, count } = this.props.otcMining;
    console.log(this.state.isChecked);
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
            placeholder={`${formatMessage({ id: `OTC_SALE_CONDITIONS_01` })}${initInfo.amountMin}-${
              initInfo.amountMax
            }${formatMessage({ id: `OTC_SALE_CONDITIONS_02` })}`}
            value={count}
            onChange={e => this.onCountChange(e.target.value)}
          />
          <aside>
            <span>
              {formatMessage({ id: `OTC_ABROAD_TRADE` })}
              {downFixed(initInfo.otcnum)}
            </span>
            <span>
              {formatMessage({ id: `OTC_ABROAD_USABLE` })}：{downFixed(initInfo.balance)}
            </span>
          </aside>
          <button onClick={this.onSubmit}>{formatMessage({ id: `OTC_CONFIRM_SALE` })}</button>
        </div>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={this.state.isChecked}
              onChange={e => {
                this.setState({ isChecked: e.target.checked });
              }}
            />
            {formatMessage({ id: `OTC_INLAND_CHECKBOX` })}
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
