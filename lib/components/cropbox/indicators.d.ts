import React from 'react';
import { IndicatorHandler, SharedValue } from '../../types';
interface IndicatorsProps {
    top: SharedValue;
    bottom: SharedValue;
    right: SharedValue;
    left: SharedValue;
    containerWidth: number;
    containerHeight: number;
}
declare const _default: React.ForwardRefExoticComponent<IndicatorsProps & React.RefAttributes<IndicatorHandler>>;
export default _default;
