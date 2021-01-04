import * as React from 'react';
import './Card.css';
export interface CardProps {
    withoutOffset?: boolean;
    classNames?: any;
    onClick?: () => void;
}
export interface CardState {
}
export declare class Card extends React.Component<CardProps, CardState> {
    static defaultProps: Partial<CardProps>;
    render(): JSX.Element;
}
