import React from 'react';
import { FooterHandler } from '../../types';
interface FooterProps {
    onCancel: () => void;
    onDone: () => void;
    onReset: () => void;
}
declare const _default: React.ForwardRefExoticComponent<FooterProps & React.RefAttributes<FooterHandler>>;
export default _default;
