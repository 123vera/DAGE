import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import { Toast, Button } from 'antd-mobile';
import PageHeader from '../../../components/common/PageHeader';
import Captcha from '../../../components/partials/Captcha';
import { COUNT_DOWN, REG } from '../../../utils/constants';
import styles from './index.less';
import { Icons } from '../../../assets';
import Menus from '../../../components/common/Menus';
import { downFixed } from '../../../utils/utils';

@connect(({ globalModel, exchange }) => ({ globalModel, exchange }))
class Index extends Component {
  state = {
    showBeforeMenus: false,
    showAfterMenus: false,
    count: COUNT_DOWN,
    timer: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'globalModel/UpdateState',
      payload: { captcha: '' },
    });
    dispatch({
      type: 'exchange/UpdateState',
      payload: { amount: '', code: '' },
    });
    this.getCaptcha();
    dispatch({ type: 'exchange/ExchangeInit' }).then(res => {
      if (res.status !== 1) Toast.info(res.msg);
      this.initCoins();
    });
  }

  getCaptcha = () => {
    this.props.dispatch({ type: 'globalModel/GetCaptcha' });
  };

  onShowMenus = (e, type, value) => {
    this.setState({ [type]: value });
    e.stopPropagation();
  };

  onHideMenus = e => {
    this.setState({ showBeforeMenus: false, showAfterMenus: false });
    e.stopPropagation();
  };

  initCoins = coin => {
    let beforeCoins = [];
    let afterCoins = [];
    const {
      dispatch,
      exchange: { teams, beforeCoin },
    } = this.props;

    if (!coin) {
      coin = beforeCoin;
    }

    teams.forEach(team => {
      beforeCoins.push({
        label: team.split('_')[0].toUpperCase(),
        value: team.split('_')[0].toLowerCase(),
      });
    });

    //  数组内对象去重
    let hash = {};
    let newBeforeCoins = beforeCoins.reduceRight((item, next) => {
      // eslint-disable-next-line no-unused-expressions
      hash[next.label] ? '' : (hash[next.label] = true && item.push(next));
      return item;
    }, []);

    teams.find(team => {
      if (team.split('_')[0] === coin.label) {
        afterCoins.push({
          label: team.split('_')[1].toUpperCase(),
          value: team.split('_')[1].toLowerCase(),
        });
      }
    });

    dispatch({
      type: 'exchange/UpdateState',
      payload: { beforeCoins: newBeforeCoins, afterCoins },
    });
  };

  changeBeforeCoin = async coin => {
    await this.initCoins(coin);
    const {
      dispatch,
      exchange: { afterCoins, afterCoin },
    } = this.props;

    dispatch({
      type: 'exchange/UpdateState',
      payload: { beforeCoin: coin, afterCoin: afterCoins[0] },
    });

    this.setState({ showBeforeMenus: false });
    dispatch({
      type: 'exchange/ExchangeInit',
      payload: {
        currency1: coin.label,
        currency2: afterCoin.label,
      },
    });
  };

  changeAfterCoin = async coin => {
    const {
      dispatch,
      exchange: { beforeCoin },
    } = this.props;
    await this.props.dispatch({ type: 'exchange/UpdateState', payload: { afterCoin: coin } });
    this.setState({ showAfterMenus: false });
    dispatch({
      type: 'exchange/ExchangeInit',
      payload: {
        currency1: beforeCoin.label,
        currency2: coin.label,
      },
    });
  };

  onAmountChange = value => {
    const reg = /^\d+(\.)?\d{0,2}?$/;
    if (value && !reg.test(value)) {
      return;
    }
    this.props.dispatch({
      type: 'exchange/UpdateState',
      payload: { amount: value },
    });
  };

  onCaptchaChange = value => {
    this.props.dispatch({
      type: 'globalModel/UpdateState',
      payload: { captcha: value },
    });
  };

  countDown = () => {
    const { timer } = this.state;
    clearInterval(Number(timer));
    this.setState({
      count: COUNT_DOWN,
      timer: setInterval(() => {
        let { count } = this.state;
        if (count && count >= 1) {
          this.setState({ count: count - 1 });
        } else {
          clearInterval(Number(timer));
        }
      }, 1000),
    });
  };

  getSmsCode = () => {
    const { dispatch } = this.props;
    const { captcha } = this.props.globalModel;
    if (!captcha) {
      Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_CAPTCHA` }));
      return;
    }
    this.countDown();
    dispatch({ type: 'globalModel/GetSmsCode', payload: { type: 'exchange' } }).then(res => {
      if (res.status === 1) {
        Toast.info(formatMessage({ id: `TOAST_GET_CODE_SUCCESS` }));
        return;
      }
      clearInterval(Number(this.state.timer));
      Toast.info(res.msg || formatMessage({ id: `TOAST_GET_CODE_FAIL` }));
    });
  };

  onCodeChange = value => {
    if (value && !REG.NUMBER.test(value)) return;
    this.props.dispatch({
      type: 'exchange/UpdateState',
      payload: { code: value },
    });
  };

  onSubmit = () => {
    const { dispatch, exchange } = this.props;
    const { amount, balance, code } = exchange;

    if (!amount) {
      Toast.info(formatMessage({ id: `EXCHANGE_PLACEHOLDER_AMOUNT` }));
      return;
    }
    if (Number(amount) > Number(balance)) {
      Toast.info(formatMessage({ id: `EXCHANGE_BALANCE_NOT_ENOUGH` }));
      return;
    }
    if (!code) {
      Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_CODE` }));
      return;
    }
    dispatch({ type: 'exchange/SubmitExchange' }).then(res => {
      if (res.status !== 1) return Toast.info(res.msg);
      Toast.info(formatMessage({ id: `EXCHANGE_SUCCESS` }), 2, () => window.location.reload());
    });
  };

  render() {
    const { captchaSrc, captcha } = this.props.globalModel;
    const {
      beforeCoins,
      afterCoins,
      beforeCoin,
      afterCoin,
      initInfo,
      balance,
      amount,
      code,
    } = this.props.exchange;
    const { showBeforeMenus, showAfterMenus, count } = this.state;

    return (
      <div className={styles.exchange} onClick={this.onHideMenus}>
        <PageHeader
          title={formatMessage({ id: `EXCHANGE_TITLE` })}
          leftContent={{ icon: Icons.arrowLeft }}
        />

        <div className={styles.wrapper}>
          <div className={styles.mainContent}>
            <div className={styles.selectCurrency}>
              <span
                className={styles.coinSelect}
                onClick={e => this.onShowMenus(e, 'showBeforeMenus', !showBeforeMenus)}
              >
                {beforeCoin.label}
                <img src={Icons.arrowDown} alt="" />
                {showBeforeMenus && (
                  <div className={styles.menus}>
                    <Menus
                      menus={beforeCoins}
                      active={beforeCoin.value}
                      hasBorder
                      textAlign="center"
                      onHandle={this.changeBeforeCoin}
                    />
                  </div>
                )}
              </span>
              <img className={styles.splitImg} src={Icons.arrowLeft} alt="" />
              <span
                className={styles.coinSelect}
                onClick={e => this.onShowMenus(e, 'showAfterMenus', !showAfterMenus)}
              >
                {afterCoin.label}
                <img src={Icons.arrowDown} alt="" />
                {showAfterMenus && (
                  <div className={styles.menus}>
                    <Menus
                      menus={afterCoins || afterCoin}
                      active={afterCoin.value}
                      hasBorder
                      textAlign="center"
                      onHandle={this.changeAfterCoin}
                    />
                  </div>
                )}
              </span>
            </div>
            <small className={styles.notice}>
              {formatMessage({ id: `EXCHANGE_RATE` })}
              {downFixed(1)} {beforeCoin.label} = {downFixed(initInfo.RATIO) || '--'}{' '}
              {afterCoin.label}
            </small>
            <label>
              <span className={styles.label}>
                {formatMessage({ id: `EXCHANGE_AMOUNT` })} ({beforeCoin.label})
              </span>
              <input
                type="text"
                autoComplete="off"
                value={amount}
                onBlur={() =>
                  amount &&
                  this.props.dispatch({
                    type: 'exchange/UpdateState',
                    payload: { amount: downFixed(amount) },
                  })
                }
                onChange={e => this.onAmountChange(e.target.value)}
                placeholder={`${formatMessage({ id: `EXCHANGE_MIN_AMOUNT` })}${initInfo.MIN ||
                  '--'}`}
              />
              <p className={styles.tips}>
                {formatMessage({ id: `EXCHANGE_CAN_USE` })}
                {beforeCoin.label}：{downFixed(balance)}
                <small>
                  {formatMessage({ id: `EXCHANGE_FEE_RATE` })}
                  {amount ? downFixed(initInfo.CHARGE * 100) : '0'}%
                </small>
              </p>
            </label>
            <Captcha
              captchaSrc={captchaSrc}
              value={captcha}
              onChange={e => this.onCaptchaChange(e.target.value)}
              getCaptcha={this.getCaptcha}
            />
            <label>
              <span className={styles.label}>{formatMessage({ id: `EXCHANGE_LABEL_PHONE` })}</span>
              <div className={styles.codeWrapper}>
                <input
                  type="number"
                  autoComplete="off"
                  value={code}
                  maxLength={4}
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CODE` })}
                  onChange={e => this.onCodeChange(e.target.value)}
                />
                <button
                  disabled={count > 0 && count < COUNT_DOWN}
                  className={styles.codeNumber}
                  onClick={this.getSmsCode}
                >
                  {count > 0 && count < COUNT_DOWN
                    ? count + 's'
                    : formatMessage({ id: `REGISTER_GET_CODE` })}
                </button>
              </div>
            </label>

            <p className={`${styles.labelTag} ${styles.small}`}>
              {formatMessage({ id: `EXCHANGE_FEE` })}{' '}
              <small>
                {amount ? downFixed(amount * initInfo.RATIO * initInfo.CHARGE) : '--'}
                &nbsp;({afterCoin.label})
              </small>
            </p>
            <p className={styles.labelTag}>
              {formatMessage({ id: `EXCHANGE_PAIDIN_AMOUNT` })}
              <small>
                {amount > initInfo.CHARGE * 100
                  ? downFixed(amount * initInfo.RATIO - amount * initInfo.RATIO * initInfo.CHARGE)
                  : '--'}
                &nbsp;({afterCoin.label})
              </small>
            </p>
          </div>
          <p className={styles.reminder}>{formatMessage({ id: `EXCHANGE_TIPS` })}</p>

          <Button className={styles.btn} onClick={this.onSubmit}>
            {formatMessage({ id: `COMMON_CONFIRM` })}
          </Button>
        </div>
      </div>
    );
  }
}

export default Index;
