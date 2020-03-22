import React, { Component } from 'react';
import styles from './incex.less';
import Header from '../../../../components/common/Header';
import { Icons } from '../../../../assets';
import { REG } from '../../../../utils/constants';
import { Toast } from 'antd-mobile';
import { downFixed } from '../../../../utils/utils';
import { connect } from 'dva';

@connect(({ otcMining, globalModel }) => ({ otcMining, globalModel }))
class OtcMining extends Component {
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
      return Toast.info('请填写出售数量');
    }
    if (Number(count) > Number(myInfo.dgt)) {
      return Toast.info('余额不足');
    }
    if (Number(count) < initInfo.amountMin || Number(count) > initInfo.amountMax) {
      return Toast.info(`出售数量需在${initInfo.amountMin}-${initInfo.amountMax}之间`);
    }
    // if (Number(count) > 200) {
    //   return Toast.info(`OTC交易余额不足，请前往去中心化交易所兑换`);
    // }
    this.props.dispatch({ type: 'otcMining/OtcSubmit' }).then(res => {
      if (res.status !== 1) {
        return Toast.info(res.msg);
      }
      Toast.info('出售成功', 2, () => window.location.reload());
    });
  };

  render() {
    const { initInfo, count } = this.props.otcMining;
    const { myInfo } = this.props.globalModel;

    return (
      <div className={styles.otcMining}>
        <header>
          <Header
            title={'OTC挖矿国际区'}
            icon={Icons.arrowLeft}
            rightContent={{
              text: '下载插件',
              textStyle: { color: '#F3AF66', fontSize: '0.24rem' },
            }}
          />
        </header>
        <div className={styles.form}>
          <label className={styles.label}>出售数量（DGT）</label>
          <input
            type="text"
            placeholder={`单笔出售数量需在${initInfo.amountMin}-${initInfo.amountMax}之间`}
            value={count}
            onChange={e => this.onCountChange(e.target.value)}
          />
          <aside>
            <span>OTC交易额度：--</span>
            <span>可用DGT：{downFixed(myInfo.dgt)}</span>
          </aside>
          <button onClick={this.onSubmit}>确认出售</button>
        </div>
        <div className={styles.reminder}>
          <label className={styles.label}>友情提示</label>
          <p>
            <small>
              3.每次出售数量的0.3%作为OTC挖矿奖金发放给用户，奖金的70%发放DGC，30%发放DID
            </small>
          </p>
          <p>
            <small>
              4.出售DGT需要消耗OTC交易额度，当OTC交易额度不足时，无法进行出售DGT，OTC交易额度可用DID兑换获得。
            </small>
          </p>
          <p>
            <small>
              5.正在进行OTC挖矿的DGT最高为30,000个，若出售DGT导致OTC挖矿的DGT超过30,000个，则此次出售不会成功。
            </small>
          </p>
        </div>
      </div>
    );
  }
}

export default OtcMining;
