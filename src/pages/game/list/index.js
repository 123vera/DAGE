import React, { Component } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import { Icons } from '../../../assets';
import { Modal } from 'antd-mobile';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ game, gameList }) => ({ game, gameList }))
class Index extends Component {
  componentDidMount() {
    const type = this.props.location.query.type;
    type && this.getGamelist(type);
  }

  getGamelist = type => {
    const { dispatch } = this.props;

    dispatch({
      type: `game/GetGamelist`,
      payload: { type, page: 1, row: 10 },
    });
  };

  getGameAddress = id => {
    return new Promise(resolve => {
      this.props.dispatch({
        type: `game/GetGameAddress`,
        payload: { id },
      });
      resolve();
    });
  };

  showModal = async (id, name) => {
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
    const {
      game: { gameList },
    } = this.props;
    const title = this.props.location.query.type;

    return (
      <div id={styles.gameList}>
        <PageHeader title={title} leftContent={{ icon: Icons.arrowLeft }} />

        <ul className={styles.contentWrapper}>
          {gameList &&
            gameList.map((i, key) => (
              <li key={key.toString()} onClick={() => this.showModal(i.gameid, i.name)}>
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
      </div>
    );
  }
}

export default Index;
