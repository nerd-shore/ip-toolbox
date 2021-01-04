import * as React from 'react';

import './Header.css';

export interface HeaderProps {
  label?: any;
  logo?: any;
  onClick?: () => void;
  navigation?: any;
  user?: any;
}

export interface HeaderState {
}

export class Header extends React.Component<HeaderProps, HeaderState> {
  protected onButtonClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  public render() {
    const { logo, label, navigation, user } = this.props;
    return (
      <div className="header" onClick={() => this.onButtonClick()}>
        <div className="header_logo">
          {logo}
          {label}
        </div>
        {
          navigation &&
            <div className="header_navigation">{navigation}</div>
        }
        {
          user &&
            <div className="header_user">{user}</div>
        }
      </div>
    );
  }
}
