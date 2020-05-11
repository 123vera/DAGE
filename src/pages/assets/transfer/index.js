import React, { Component } from 'react';
import styles from './index.less';
import PageHeader from '../../../components/common/PageHeader';
import { Icons } from '../../../assets';
import { connect } from 'dva';
import Menus from '../../../components/common/Menus';
import { downFixed } from '../../../utils/utils';
import { Toast } from 'antd-mobile';
import { router } from 'umi';
import { formatMessage } from 'umi-plugin-locale';

@connect(({ transfer, globalModel }) => ({ transfer, globalModel }))
class Index extends Component {
  state = {
    showCoins: false,
  };

  componentDidMount() {
    const { query } = this.props.location;
    const { transfer = 'DToG', type } = query;
    this.props.dispatch({
      type: 'transfer/UpdateState',
      payload: { transfer, initInfo: {}, type },
    });
    setTimeout(() => {
      this.props.dispatch({ type: 'transfer/TransferInit' });
    }, 100);
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
    // if (Array.from(value).length > 2) return;
    this.props.dispatch({
      type: 'transfer/UpdateState',
      payload: {
        num: value,
      },
    });
  };

  submit = () => {
    const { num } = this.props.transfer;
    if (!num) return Toast.info(formatMessage({ id: `TRANSFER_PLACEHOLDER_QUANTITY` }));

    this.props.dispatch({ type: 'transfer/Transfer' }).then(res => {
      if (res.status === 1) {
        res.msg && Toast.info(res.msg);
      } else {
        this.props.dispatch({
          type: 'transfer/UpdateState',
          payload: { num: '' },
        });
        Toast.info(formatMessage({ id: `TRANSFER_SUCCESSFUL` }), () => {
          router.push('/assets/transfer/record');
        });
      }
    });
  };

  render() {
    const { transfer, type, num } = this.props.transfer;
    const { showCoins } = this.state;

    console.log('type', type);
    return (
      <div id={styles.transfer}>
        <PageHeader
          title={formatMessage({ id: `ASSETS_TRANSFER` })}
          leftContent={{ icon: Icons.arrowLeft }}
          rightContent={{
            text: formatMessage({ id: `TRANSFER_RECORD_TITLE` }),
            onHandle: () => router.push('/assets/transfer/record'),
          }}
        />
        <section>
          <div className={styles.switch}>
            <ul>
              <li>
                <div className={styles.item} onClick={this.changeTransfer}>
                  <label>{formatMessage({ id: `TRANSFER_FROM` })}</label>
                  <span>
                    {transfer === 'DToG'
                      ? formatMessage({ id: `TRANSFER_DAGE_ACCOUNT` })
                      : formatMessage({ id: `TRANSFER_GAME_ACCOUNT` })}
                  </span>
                  <img src={Icons.arrowRight} alt="" />
                </div>
              </li>
              <li>
                <div className={styles.item}>
                  <label>{formatMessage({ id: `TRANSFER_TO` })}</label>
                  <span>
                    {transfer === 'GToD'
                      ? formatMessage({ id: `TRANSFER_DAGE_ACCOUNT` })
                      : formatMessage({ id: `TRANSFER_GAME_ACCOUNT` })}
                  </span>
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
            <label>{formatMessage({ id: `TRANSFER_COINS` })}</label>
            <div className={styles.inputBox}>
              <input
                placeholder={formatMessage({ id: `TRANSFER_PLACEHOLDER_COINS` })}
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
            <label>{formatMessage({ id: `TRANSFER_QUANTITY` })}</label>
            <div className={styles.inputBox}>
              <input
                placeholder={formatMessage({ id: `TRANSFER_PLACEHOLDER_QUANTITY` })}
                type="text"
                value={num}
                autoComplete="off"
                onChange={e => this.changeNum(e.target.value)}
              />
              <div className={styles.operate}>
                <span className={styles.type}>{type}</span>
                <i>|</i>
                <span onClick={() => this.changeNum(this.getCoinBalance())}>
                  {formatMessage({ id: `TRANSFER_ALL` })}
                </span>
              </div>
            </div>
            <aside>
              {formatMessage({ id: `EXCHANGE_CAN_USE` })}： {this.getCoinBalance()} {type}
            </aside>
          </div>
        </section>
        <section>
          <div className={styles.submit}>
            <button onClick={this.submit}>{formatMessage({ id: `ASSETS_TRANSFER` })}</button>
          </div>
        </section>
      </div>
    );
  }
}

export default Index;
