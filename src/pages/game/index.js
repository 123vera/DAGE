import React, { Component } from 'react';
import PageHeader from './../../components/common/PageHeader';
import { Icons } from './../../assets';
import styles from './index.less';

const list = ['热门推荐', '棋牌', '体育', '真人', '电子'];
class Game extends Component {
  state = { activeKey: 0 };

  selectLi = key => {
    this.setState({ activeKey: key });
  };

  render() {
    const { activeKey } = this.state;

    return (
      <div id={styles.game}>
        <div className={styles.banner}>
          <PageHeader
            title="游戏中心"
            leftContent={{ icon: Icons.arrowWhiteLeft }}
            rightContent={{ text: '充值', onHandle: () => {} }}
          />
          <ul>
            <li>
              <p>
                <span>1200</span>
                <span>DGT筹码</span>
              </p>
            </li>
            <li>
              <p>
                <span>2000</span>
                <span>DGT筹码</span>
              </p>
            </li>
          </ul>
        </div>
        <div className={styles.mainContent}>
          <img className={styles.top} src="" alt="" />

          <section className={styles.first}>
            <img className={styles.left} src="" alt="" />
            <div className={styles.rightWrapper}>
              <img className={styles.right} src="" alt="" />
              <img className={styles.right} src="" alt="" />
              <img className={styles.right} src="" alt="" />
              <img className={styles.right} src="" alt="" />
            </div>
          </section>

          <section className={styles.second}>
            <div className={styles.navWrapper}>
              <ul className={styles.tabNav}>
                {list.map((i, key) => (
                  <li
                    key={key.toString()}
                    className={activeKey === key ? styles.active : ''}
                    onClick={() => this.selectLi(key)}
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <ul className={styles.contentWrapper}>
              <li>
                <img src="" alt="" />
                <p className={styles.center}>
                  <span>323</span>
                  <span>323</span>
                </p>
                <p className={styles.right}>
                  <span>323</span>
                  <span>323</span>
                </p>
              </li>
              <li></li>
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

export default Game;
