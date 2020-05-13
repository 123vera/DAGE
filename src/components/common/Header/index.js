import React, { Component } from 'react';
import router from 'umi/router';
import { Icons } from '../../../assets';
import styles from './index.less';

const HeaderItem = function(props) {
  const {
    icon,
    iconStyle,
    iconWidth,
    iconHeight,
    text,
    textStyle,
    textSize,
    onHandle,
    reverse,
  } = props;
  return (
    <div
      className={`${styles.headerItem} ${reverse ? styles.reverse : ''}`}
      onClick={e => onHandle && onHandle(e)}
    >
      {icon && (
        <i>
          <img
            src={icon || Icons.arrowLeft}
            style={{ ...iconStyle, width: iconWidth, height: iconHeight }}
            alt="ICON"
          />
        </i>
      )}
      <span
        style={{
          ...textStyle,
          fontSize: textSize || (textStyle && textStyle.fontSize),
        }}
      >
        {text}
      </span>
    </div>
  );
};

class Header extends Component {
  render() {
    let { leftContent, centerContent, rightContent, icon, title, onHandle } = this.props;
    title && (centerContent = centerContent ? (centerContent.text = title) : { text: title });
    icon && (leftContent = leftContent ? (leftContent.icon = icon) : { icon: icon });
    leftContent &&
      (leftContent.onHandle = onHandle || leftContent.onHandle || (() => router.goBack()));
    return (
      <header className={styles.header}>
        {leftContent && (
          <div className={styles.leftContent}>
            <HeaderItem {...leftContent} />
          </div>
        )}
        {centerContent && (
          <div className={styles.centerContent}>
            <HeaderItem {...centerContent} />
          </div>
        )}
        {rightContent && (
          <div className={styles.rightContent}>
            <HeaderItem {...rightContent} />
          </div>
        )}
      </header>
    );
  }
}

export default Header;
