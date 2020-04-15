import React, { Component } from 'react';
import PageHeader from './../../components/common/PageHeader';
import { Icons } from './../../assets';
import styles from './index.less';

class Game extends Component {
  render() {
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
      </div>
    );
  }
}

export default Game;
