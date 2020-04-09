import React, { Component } from 'react';
import Menus from '../../common/Menus';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';

@connect(({ globalModel }) => ({ globalModel }))
class Coins extends Component {
  state = {
    menus: [],
  };

  componentDidMount() {
    let { dispatch, coin } = this.props;
    dispatch({
      type: 'globalModel/GetCurrencyList',
      payload: {},
    }).then(coins => {
      coin = coin || coins[0];
      const menus = coins.map(coin => ({
        label: coin,
        value: coin,
      }));
      this.setState({ menus });
      this.changeCoin({
        label: coin,
        value: coin,
      });
    });
  }

  changeCoin = menu => {
    const { onHandle } = this.props;
    onHandle && onHandle(menu.value);
  };

  render() {
    const { menus } = this.state;
    return (
      <div>
        <Menus
          menus={menus.concat([{ label: formatMessage({ id: `DGT_RECHARGE_TITLE` }), value: '_DGT' }])}
          textAlign="center"
          hasBorder
          onHandle={this.changeCoin}
        />
      </div>
    );
  }
}

export default Coins;
