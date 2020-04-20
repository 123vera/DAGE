import React, { Component } from 'react';
import styles from './index.less';
import PageHeader from '../../../components/common/PageHeader';
// import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';
import { connect } from 'dva';
import Menus from '../../../components/common/Menus';
import { downFixed } from '../../../utils/utils';
import { Toast } from 'antd-mobile';
import { router } from 'umi';

@connect(({ transfer, globalModel }) => ({ transfer, globalModel }))
class Index extends Component {
  state = {
    showCoins: false,
  };

  componentDidMount() {
    const { query } = this.props.location;
    const { transfer = 'DToG' } = query;
    this.props.dispatch({ type: 'transfer/UpdateState', payload: { transfer, num: '' } });
    this.props.dispatch({ type: 'transfer/TransferInit' });
  }

  changeTransfer = () => {
    const { transfer } = this.props.transfer;
    this.props.dispatch({
      type: 'transfer/UpdateState',
      payload: {
        transfer: transfer === 'DToG' ? 'GToD' : 'DToG',
      },
    });
  };

  getCoins = () => {
    const { initInfo, transfer } = this.props.transfer;
    const list = transfer === 'DToG' ? initInfo.DAGECURRENCY : initInfo.GAMECURRENCY;
    return (list && list.map(i => ({ label: i, value: i }))) || [];
  };

  getCoinBalance = () => {
    const { initInfo, transfer, type } = this.props.transfer;
    const transferBalance = transfer === 'DToG' ? initInfo.dage : initInfo.game;
    const result = transferBalance && transferBalance[type.toLocaleLowerCase()];
    return downFixed(result) || 0;
  };

  changeCoin = ({ value }) => {
    this.props.dispatch({
      type: 'transfer/UpdateState',
      payload: {
        type: value,
      },
    });
    this.setState({ showCoins: false });
  };

  changeNum = value => {
    const reg = /^\d+(\.)?\d{0,2}?$/;
    if (value && !reg.test(value) && value !== 0) {
      return;
    }
    if (Array.from(value).length > 2) return;
    this.props.dispatch({
      type: 'transfer/UpdateState',
      payload: {
        num: value,
      },
    });
  };

  submit = () => {
    const { num } = this.props.transfer;
    if (!num) return Toast.info('请输入划转数量');
    // if (num > this.getCoinBalance()) return Toast.info('余额不足');
    this.props.dispatch({ type: 'transfer/Transfer' }).then(res => {
      if (res.status !== 1) return Toast.info(res.msg);
      this.props.dispatch({
        type: 'transfer/UpdateState',
        payload: { num: '' },
      });
      Toast.info('划转成功', () => {
        router.push('/assets/transfer/record');
      });
    });
  };

  render() {
    const { transfer, type, num } = this.props.transfer;
    const { showCoins } = this.state;
    return (
      <div id={styles.transfer}>
        <PageHeader
          title="划转"
          leftContent={{ icon: Icons.arrowLeft }}
          rightContent={{
            text: '划转记录',
            onHandle: () => router.push('/assets/transfer/record'),
          }}
        />
        <section>
          <div className={styles.switch}>
            <ul>
              <li>
                <div className={styles.item} onClick={this.changeTransfer}>
                  <label>从</label>
                  <span>{transfer === 'DToG' ? 'DAGE账户' : '游戏账户'}</span>
                  <img src={Icons.arrowRight} alt="" />
                </div>
              </li>
              <li>
                <div className={styles.item}>
                  <label>到</label>
                  <span>{transfer === 'GToD' ? 'DAGE账户' : '游戏账户'}</span>
                  <img src={Icons.arrowRight} alt="" />
                </div>
              </li>
            </ul>
            <div className={styles.transferIcon} onClick={this.changeTransfer}>
              <img src={Icons.transfer} alt="" />
            </div>
          </div>
        </section>
        <section>
          <div className={styles.group}>
            <label>币种</label>
            <div className={styles.inputBox}>
              <input
                placeholder="请选择币种"
                readOnly
                autoComplete="off"
                value={type}
                type="text"
                onClick={() => this.setState({ showCoins: !showCoins })}
              />
              <div className={styles.operate}>
                <img src={Icons.arrowRight} alt="" />
              </div>
              <div className={styles.coins} style={{ display: showCoins ? 'block' : 'none' }}>
                <Menus
                  menus={this.getCoins()}
                  hasBorder
                  maxWidth="100%"
                  textAlign="left"
                  onHandle={this.changeCoin}
                />
              </div>
            </div>
          </div>
          <div className={styles.group}>
            <label>划转数量</label>
            <div className={styles.inputBox}>
              <input
                placeholder="请输入划转数量"
                type="text"
                value={num}
                autoComplete="off"
                onChange={e => this.changeNum(e.target.value)}
              />
              <div className={styles.operate}>
                <span className={styles.type}>{type}</span>
                <i>|</i>
                <span onClick={() => this.changeNum(this.getCoinBalance())}>全部</span>
              </div>
            </div>
            <aside>
              可用 {this.getCoinBalance()} {type}
            </aside>
          </div>
        </section>
        <section>
          <div className={styles.submit}>
            <button onClick={this.submit}>划转</button>
          </div>
        </section>
      </div>
    );
  }
}

export default Index;
