import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import router from 'umi/router';
import { Toast, Button } from 'antd-mobile';
import PageHeader from '@/components/common/PageHeader';
import ARROW_LEFT from '@/assets/icons/arrow-left.png';
import ARROW_DOWN from '@/assets/icons/arrow-down.png';
import { COUNT_DOWN, REG } from '../../../utils/constants';
import styles from './index.less';

@connect(({ exchange }) => ({ exchange }))
class Index extends Component {
  state = {
    count: COUNT_DOWN,
    timer: null,
    position: null,
  };

  checkAside = type => {
    if (type === 'left') {
      this.setState({ position: { left: '10%', display: 'block' } });
    } else {
      this.setState({ position: { right: '10%', display: 'block' } });
    }
  };

  countDown = () => {
    const { timer } = this.state;
    clearInterval(Number(timer));
    this.getSmsCode();
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
    Toast.info('获取验证码成功');
  };

  onChangeSmsCode = e => {
    const {
      target: { value },
    } = e;
    const { dispatch } = this.props;
    dispatch({
      type: 'exchange/UpdateState',
      payload: { smsCode: value },
    });
  };

  onChangeAmount = e => {
    const {
      target: { value },
    } = e;
    const { dispatch } = this.props;
    if (!REG.NUMBER.test(value)) return;
    dispatch({
      type: 'exchange/UpdateState',
      payload: { amount: value },
    });
  };

  render() {
    const {
      exchange: { amount, smsCode },
    } = this.props;
    const { count, position } = this.state;

    return (
      <div id={styles.exchange}>
        <PageHeader title="生态" leftContent={{ icon: ARROW_LEFT }} />

        <div
          className={styles.wrapper}
          onClick={e => {
            this.setState({ position: null });
          }}
        >
          <div className={styles.mainContent}>
            <div className={styles.selectCurrency}>
              <span onClick={() => this.checkAside('left')}>
                USDT <img src={ARROW_DOWN} alt="" />
              </span>
              <img
                style={{ transform: 'rotate(180deg)', margin: ' 0 60px' }}
                src={ARROW_LEFT}
                alt=""
              />
              <span onClick={() => this.checkAside('right')}>
                DGT <img src={ARROW_DOWN} alt="" />
              </span>
              <div
                className={styles.popover}
                style={{ ...position }}
                onClick={e => e.preventDefault()}
              >
                <span className={styles.checkItem}>DGC</span>
                <span className={styles.checkItem}>USDT</span>
              </div>
            </div>

            <small className={styles.notice}>当前兑换比例：1 USDT = 1 DGT</small>
            <label>
              <span className={styles.label}>兑换数量</span>
              <input
                type="text"
                autoComplete="off"
                value={amount}
                onChange={this.onChangeAmount}
                placeholder={`最小兑换数量${10.0}`}
              />
              <p className={styles.tips}>
                可用USDT：10000.45 <small>手续费率:0%</small>
              </p>
            </label>

            <label>
              <span className={styles.label}>手机验证码</span>
              <div className={styles.codeWrapper}>
                <input
                  type="number"
                  autoComplete="off"
                  value={smsCode}
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CODE` })}
                  onChange={this.onChangeSmsCode}
                />
                <button
                  disabled={count > 0 && count < COUNT_DOWN}
                  className={styles.codeNumber}
                  onClick={this.countDown}
                >
                  {count > 0 && count < COUNT_DOWN
                    ? count + 's'
                    : formatMessage({ id: `REGISTER_GET_CODE` })}
                </button>
              </div>
            </label>

            <p className={`${styles.labelTag} ${styles.small}`}>
              手续费 <small>--</small>
            </p>
            <p className={styles.labelTag}>
              到账数量<small>--</small>
            </p>
          </div>
          <p className={styles.reminder}>温馨提示：推广期间兑换手续费减免</p>

          <Button className={styles.btn}>确认</Button>
        </div>
      </div>
    );
  }
}

export default Index;
