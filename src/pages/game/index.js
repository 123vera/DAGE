import React, { Component } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { Icons } from '../../assets';
import { connect } from 'dva';
import styles from './index.less';
import { router } from 'umi';
import { Modal } from 'antd-mobile';
import { downFixed } from '../../utils/utils';
import { formatMessage } from 'umi-plugin-locale';

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

    // dispatch({
    //   type: `game/UpdateState`,
    //   payload: { dgtBalance: '--', rcBalance: '--' },
    // });

    dispatch({
      type: `game/GetGameList`,
      payload: { type: typelist[key], page: 1, row: 10 },
    });
  };

  getGameAddress = id => {
    return new Promise(resolve => {
      this.props.dispatch({
        type: `game/GetGameAddress`,
        payload: { gameid: id },
      });
      resolve();
    });
  };

  showModal = async (id, name) => {
    Modal.alert(
      '',
      <p>
        <span dangerouslySetInnerHTML={{ __html: formatMessage({ id: `GAME_LEAVING_01` }) }}></span>
        「{name}」
      </p>,
      [
        {
          text: formatMessage({ id: `COMMON_CANCEL` }),
          style: { fontSize: '0.34rem' },
          onPress: () => {},
        },
        {
          text: formatMessage({ id: `GAME_START` }),
          style: { fontSize: '0.34rem' },
          onPress: () => {
            this.getGameAddress(id).then(res => {
              const {
                game: { gameUrl },
              } = this.props;

              gameUrl && (window.location.href = gameUrl);
            }, 100);
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
            title={formatMessage({ id: `GAME_TITLE` })}
            leftContent={{ icon: Icons.arrowWhiteLeft }}
            rightContent={{
              text: formatMessage({ id: `GAME_RECHARGE` }),
              onHandle: () => router.push('/assets/transfer?transfer=GToD'),
            }}
          />
          <ul>
            <li>
              <p>
                <span>{downFixed(dgtBalance)}</span>
                <span>{formatMessage({ id: `GAME_DGT` })}</span>
              </p>
            </li>
            <li>
              <p>
                <span>{downFixed(rcBalance)}</span>
                <span>{formatMessage({ id: `GAME_RC` })}</span>
              </p>
            </li>
          </ul>
        </div>
        <div className={styles.mainContent}>
          <img
            alt=""
            className={styles.top}
            src={banner.bannerUrl}
            onClick={() => this.showModal(banner.gameid, banner.gameName)}
          />

          <section className={styles.first}>
            <h3>{formatMessage({ id: `GAME_RECOMMEND` })}</h3>
            <div className={styles.imgGroup}>
              <p
                className={styles.leftWrapper}
                onClick={() => this.showModal(imgList[0].gameid, imgList[0].name)}
              >
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
              {gameList.slice(0, 3).map((i, key) => (
                <li key={key.toString()} onClick={() => this.showModal(i.gameid, i.name)}>
                  <img src={i.img} alt="" />
                  <p className={styles.center}>
                    <span>{i.name}</span>
                    <span>NO.{key + 1}</span>
                  </p>
                  <p className={styles.right}>
                    <span>
                      {formatMessage({ id: `GAME_TYPE` })}
                      {i.type}
                    </span>
                    <span>
                      {formatMessage({ id: `GAME_PLAT` })}
                      {i.technology}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
            <p
              onClick={() =>
                router.push({
                  pathname: '/game_list',
                  query: { type: typelist ? typelist[activeKey] : '' },
                })
              }
              // onClick={() => router.push(`/game_list?type=${typelist ? typelist[activeKey] : ''}`)}
              className={styles.viewAll}
            >
              {formatMessage({ id: `GAME_VIEW_ALL` })}
            </p>
          </section>
        </div>
      </div>
    );
  }
}

export default Game;
