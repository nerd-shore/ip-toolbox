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
export declare class Header extends React.Component<HeaderProps, HeaderState> {
    protected onButtonClick(): void;
    render(): JSX.Element;
}
