import React, { Component } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import { Icons } from '../../../assets';
import { Modal, Toast } from 'antd-mobile';
import { connect } from 'dva';
import styles from './index.less';
import ListView from '../../../components/common/ListView';

@connect(({ game, gameList }) => ({ game, gameList }))
class Index extends Component {
  componentDidMount() {
    const { type } = this.props.location.query;
    this.props.dispatch({
      type: 'gameList/UpdateState',
      payload: {
        hasMore: true,
        list: [],
        page: 1,
        type,
      },
    });
    this.getList();
  }

  getList = callback => {
    this.props.dispatch({ type: 'gameList/GetGameList' }).then(res => {
      callback && callback();
      if (res.status !== 1) Toast.info(res.msg);
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
      <span style={{ lineHeight: '1.3', textAlign: 'left', fontSize: '0.32rem', color: '#000' }}>
        即将离开DAGE，
        <br /> 启动「{name}」
      </span>,
      '',
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
    const { list, type, hasMore } = this.props.gameList;

    return (
      <div id={styles.gameList}>
        <PageHeader title={type} leftContent={{ icon: Icons.arrowLeft }} />
        <ListView hasMore={hasMore} onLoadMore={this.getList}>
          <ul className={styles.contentWrapper}>
            {list.map((i, key) => (
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
        </ListView>
      </div>
    );
  }
}

export default Index;
