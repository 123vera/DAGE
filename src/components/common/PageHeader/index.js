import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';

class PageHeader extends Component {
  clickLeft = () => {
    const { leftContent } = this.props;
    if (leftContent.onHandle) {
      leftContent.onHandle();
    } else {
      router.goBack();
    }
  };

  clickRight = () => {
    const { rightContent } = this.props;
    if (rightContent.onHandle) {
      rightContent.onHandle();
    } else {
      router.goBack();
    }
  };

  render() {
    const { fixed, leftContent = {}, rightContent = {}, title } = this.props;
    return (
      <header id={styles.header} className={fixed ? styles.positionFixed : ''}>
        <aside className={styles.left} onClick={this.clickLeft}>
          {leftContent.icon && <img src={leftContent.icon} alt="" />}
        </aside>
        <h3>{title || ''}</h3>
        <aside className={styles.right} onClick={this.clickRight}>
          {rightContent.icon && <img src={rightContent.icon} alt="" />}
          <span>{rightContent.text}</span>
        </aside>
      </header>
    );
  }
}

export default PageHeader;
