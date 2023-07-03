import React from 'react';
import { Animated } from 'react-native';
import { SharedValue } from '../../types';
interface OverlayProps {
    top: SharedValue;
    bottom: SharedValue;
    right: SharedValue;
    left: SharedValue;
    rounded?: boolean;
    containerWidth: number;
    containerHeight: number;
    backdropOpacity: Animated.AnimatedInterpolation;
    minCropperBoxSize: {
        width: number;
        height: number;
    };
}
declare const Overlay: React.FC<OverlayProps>;
export default Overlay;
