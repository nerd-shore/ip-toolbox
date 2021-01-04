import * as React from 'react';
import { noop } from '@dns/utils';

import './Card.css';

export interface CardProps {
  /** remove the padding from the card  */
  withoutOffset?: boolean;
  /** additional classNames provided by the parent  */
  classNames?: any;
  /** optional onClick function */
  onClick?: () => void;
}

export interface CardState {
}

export class Card extends React.Component<CardProps, CardState> {
  public static defaultProps: Partial<CardProps> = {
    onClick: noop,
  };

  public render() {
    const { classNames, withoutOffset, onClick } = this.props;
    return (
      <div
        className={`
          card
          ${withoutOffset ? 'card_without-offset' : ''}
          ${classNames ? classNames : ''}
        `}
        onClick={onClick}
      >
        {this.props.children}
      </div>
    );
  }
}
