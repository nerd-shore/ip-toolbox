import * as React from 'react';
import { Notification as NotificationD } from '../definitions';
import './Notification.css';
export interface NotificationProps {
    item: NotificationD;
    onCloseNotification: (id: number | string) => {};
    visibilityTimeout?: number;
    decayTime?: number;
    decayTimeout?: number;
    closeTimeout?: number;
    stacked?: boolean;
    position?: 'bl' | 'bc' | 'br' | 'tl' | 'tc' | 'tr';
}
export interface NotificationState {
    visible: boolean;
}
export declare class Notification extends React.Component<NotificationProps, NotificationState> {
    static defaultProps: Partial<NotificationProps>;
    _checkForDecayTimeout: any;
    _showTimeout: any;
    _closeTimeout: any;
    constructor(props: NotificationProps, context: object);
    componentWillUnmount(): void;
    makeVisible: () => void;
    checkForDecay: () => void;
    closeNotification: () => void;
    render(): JSX.Element;
}
