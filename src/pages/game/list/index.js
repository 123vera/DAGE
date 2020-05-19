import React, { Component } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import { Icons } from '../../../assets';
import { Modal, Toast } from 'antd-mobile';
import { connect } from 'dva';
import styles from './index.less';
import ListView from '../../../components/common/ListView';
import { formatMessage } from 'umi-plugin-locale';

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
    const { list, type, hasMore } = this.props.gameList;

    return (
      <div id={styles.gameList}>
        <PageHeader fixed title={type} leftContent={{ icon: Icons.arrowLeft }} />
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
                  <span>
                    {' '}
                    {formatMessage({ id: `GAME_TYPE` })}
                    {i.type}
                  </span>
                  <span>
                    {' '}
                    {formatMessage({ id: `GAME_PLAT` })}
                    {i.technology}
                  </span>
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
