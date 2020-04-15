import React, { Component } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import { Icons } from '../../../assets';
import { connect } from 'dva';
import styles from './index.less';

const typeArr = ['热门推荐', '棋牌', '体育', '真人', '电子'];
@connect(({ game }) => ({ game }))
class Game extends Component {
  state = { activeKey: 0 };

  selectLi = key => {
    this.setState({ activeKey: key });
  };

  render() {
    const { activeKey } = this.state;
    const {
      game: { gameList },
    } = this.props;

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
            <h3>精品推荐</h3>
            <div className={styles.imgGroup}>
              <img className={styles.left} src="" alt="" />
              <div className={styles.rightWrapper}>
                <img className={styles.right} src="" alt="" />
                <img className={styles.right} src="" alt="" />
                <img className={styles.right} src="" alt="" />
                <img className={styles.right} src="" alt="" />
              </div>
            </div>
          </section>

          <section className={styles.second}>
            <div className={styles.navWrapper}>
              <ul className={styles.tabNav}>
                {typeArr.map((i, key) => (
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
              {gameList.map((i, key) => (
                <li>
                  <img src="" alt="" />
                  <p className={styles.center}>
                    <span>323</span>
                    <span>NO.{key + 1}</span>
                  </p>
                  <p className={styles.right}>
                    <span>类型：323</span>
                    <span>平台：323</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className={styles.viewAll}>查看全部</p>
          </section>
        </div>
      </div>
    );
  }
}

export default Game;
