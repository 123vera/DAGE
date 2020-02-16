import styles from './index.less';
import React, { Component } from 'react';
import { formatMessage, setLocale, getLocale } from 'umi-plugin-locale';
import { connect } from 'dva';
import Header from '../../components/common/Header';
import { Icons, Images } from '../../assets';

@connect(({ pageHome }) => ({ pageHome }))
class Home extends Component {
  changeLang = () => {
    if (getLocale() === 'en-US') {
      setLocale('ch-CN');
    } else {
      setLocale('en-US');
    }
  };

  render() {
    return (
      <div className={styles.home}>
        <Header
          title="钱包"
          icon={{ src: Icons.list }}
          action={{ icon: { src: Icons.more } }}
        />
        <section>
          <div className={styles.banner} style={{ backgroundImage: `url(${Images.homeBg})` }}>
            <label>DAGE WALLENT</label>
            <h1>0.00</h1>
          </div>
        </section>
        <section>
          <div className={styles.notice}>
            <p>公告：即日起激活DID奖励活动开启</p>
          </div>
        </section>
        <section>
          <form>
            <h3>
              <img src={Icons.dIcon} alt=""/>
              激活ID
            </h3>
            <p>激活DID后您才可进行购买矿机，赚取收益，邀请好友等操作。</p>
            <input type="text" placeholder="请输入DID邀请码"/>
            <p className={styles.hint}>需支付 10 DGT</p>
            <button>确认激活</button>
          </form>
        </section>
      </div>
    );
  }
}

export default Home;
