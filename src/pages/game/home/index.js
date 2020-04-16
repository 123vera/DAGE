import React, { Component } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import { Icons } from '../../../assets';
import { connect } from 'dva';
import styles from './index.less';
import { router } from 'umi';
import { Modal } from 'antd-mobile';

@connect(({ game }) => ({ game }))
class Game extends Component {
  state = { activeKey: 0 };

  componentDidMount() {
    this.getRecommendgame();
    this.getTypelist();
  }

  selectLi = key => {
    this.setState({ activeKey: key });
    this.getGamelist(key);
  };

  getRecommendgame = () => {
    this.props.dispatch({
      type: `game/GetRecommendgame`,
    });
  };

  getTypelist = async () => {
    await this.props.dispatch({
      type: `game/GetTypelist`,
    });
    this.getGamelist(0);
  };

  getGamelist = key => {
    const {
      dispatch,
      game: { typelist },
    } = this.props;

    dispatch({
      type: `game/GetGamelist`,
      payload: { type: typelist[key], page: 1, row: 10 },
    });
  };

  getGameAddress = id => {
    this.props.dispatch({
      type: `game/GetGamelist`,
      payload: { id },
    });
  };

  showModal = async (id, name) => {
    this.getGameAddress(id);
    Modal.alert(
      '',
      <span>
        即将离开DAGE，
        <br /> 启动「{name}」
      </span>,
      [
        {
          text: '取消',
          style: { fontSize: '0.34rem' },
          onPress: () => {},
        },
        {
          text: '启动游戏',
          style: { fontSize: '0.34rem' },
          onHandle: () => {
            const {
              game: { gameUrl },
            } = this.props;
            window.location.href = gameUrl;
          },
        },
      ],
    );
  };

  render() {
    const { activeKey } = this.state;
    const {
      game: { banner, gameList, dgtBalance, rcBalance, imgList = [], typelist },
    } = this.props;

    return (
      <div id={styles.game}>
        <div className={styles.banner}>
          <PageHeader
            title="游戏中心"
            leftContent={{ icon: Icons.arrowWhiteLeft }}
            rightContent={{ text: '充值', onHandle: () => router.push('/assets/transfer') }}
          />
          <ul>
            <li>
              <p>
                <span>{dgtBalance}</span>
                <span>DGT筹码</span>
              </p>
            </li>
            <li>
              <p>
                <span>{rcBalance}</span>
                <span>DGT筹码</span>
              </p>
            </li>
          </ul>
        </div>
        <div className={styles.mainContent}>
          <img alt="" className={styles.top} src={banner} />

          <section className={styles.first}>
            <h3>精品推荐</h3>
            <div className={styles.imgGroup}>
              <p className={styles.leftWrapper}>
                <img className={styles.left} src={imgList[0] && imgList[0].img} alt="" />
                <span>{imgList[0] && imgList[0].name}</span>
              </p>
              <div className={styles.rightWrapper}>
                {imgList.slice(-4).map((item, key) => (
                  <p key={key.toString()} onClick={() => this.showModal(item.gameid, item.name)}>
                    <img className={styles.right} src={item.img} alt="" />
                    <span>{item.name}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.second}>
            <div className={styles.navWrapper}>
              <ul className={styles.tabNav}>
                {typelist.map((i, key) => (
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
            <ul key={activeKey} className={styles.contentWrapper}>
              {gameList.slice(3).map((i, key) => (
                <li key={key.toString()} onclick={() => this.showModal(i.gameid, i.name)}>
                  <img src={i.img} alt="" />
                  <p className={styles.center}>
                    <span>{i.name}</span>
                    <span>NO.{key + 1}</span>
                  </p>
                  <p className={styles.right}>
                    <span>类型：{i.type}</span>
                    <span>平台：{i.technology}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p
              onClick={() => router.push(`/game_list?type=${typelist ? typelist[activeKey] : ''}`)}
              className={styles.viewAll}
            >
              查看全部
            </p>
          </section>
        </div>
      </div>
    );
  }
}

export default Game;
