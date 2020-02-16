import React, { Component } from 'react';
import { withRouter } from 'umi';
import styles from './index.less';

const Icon = function(props = {}) {
  return <img
    className={props.class}
    src={props.src}
    style={{ width: props.width || '18px', height: props.height }}
    onClick={(e) => props.onClick && props.onClick(e)}
    alt=""
  />;
};

const Action = function(props = {}) {
  return <aside onClick={(e) => props.onClick && props.onClick(e)}>
    {props.icon && <Icon {...props.icon}/>}
    {props.text}
  </aside>;
};

class Header extends Component {
  render() {
    const { title = '', icon = {}, action, onClick, onAction, history } = this.props;
    icon.onClick = onClick || (() => history.goBack());
    icon.class = styles.icon;
    action.onClick = onAction;

    return (
      <header className={styles.header}>
        {icon.src && <Icon {...icon}/>}
        <span>{title}</span>
        {action && <Action {...action}/>}
      </header>
    );
  }
}

export default withRouter(Header);
