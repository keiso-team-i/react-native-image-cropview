import React, { forwardRef, useImperativeHandle, useState, } from 'react';
import { Animated } from 'react-native';
import { borderWidth } from '../../config';
import styles from '../../styles';
const Indicators = ({ top, bottom, right, left, containerWidth, containerHeight }, ref) => {
    const currentHeight = Animated.subtract(containerHeight, Animated.add(top.animatedValue.current, Animated.subtract(containerHeight, bottom.animatedValue.current)));
    const currentWidth = Animated.subtract(containerWidth, Animated.add(left.animatedValue.current, Animated.subtract(containerWidth, right.animatedValue.current)));
    const scaleY = Animated.divide(currentHeight, containerHeight);
    const scaleX = Animated.divide(currentWidth, containerWidth);
    const translateTop = top.animatedValue.current.interpolate({
        inputRange: [0, containerHeight],
        outputRange: [0, containerHeight / 2],
    });
    const translateBottom = bottom.animatedValue.current.interpolate({
        inputRange: [0, containerHeight],
        outputRange: [containerHeight / -2, 0],
    });
    const translateLeft = left.animatedValue.current.interpolate({
        inputRange: [0, containerWidth],
        outputRange: [0, containerWidth / 2],
    });
    const translateRight = right.animatedValue.current.interpolate({
        inputRange: [0, containerWidth],
        outputRange: [containerWidth / -2, 0],
    });
    const translateX = Animated.add(translateLeft, translateRight);
    const translateY = Animated.add(translateTop, translateBottom);
    const [showGrid, setShowGrid] = useState(false);
    useImperativeHandle(ref, () => ({
        showGrid: (s) => setShowGrid(s),
    }));
    const marginBarSize = 1;
    const centerBarSize = 0.5;
    const verticalBarsSpaceBetween = Animated.divide(Animated.subtract(Animated.subtract(right.animatedValue.current, left.animatedValue.current), borderWidth), 3);
    const horizontalBarsSpaceBetween = Animated.divide(Animated.subtract(Animated.subtract(bottom.animatedValue.current, top.animatedValue.current), borderWidth), 3);
    return (React.createElement(React.Fragment, null,
        React.createElement(Animated.View, { style: [
                styles.marginIndicator,
                { width: marginBarSize, height: containerHeight },
                {
                    transform: [
                        { translateY: translateY },
                        {
                            translateX: Animated.subtract(left.animatedValue.current, marginBarSize),
                        },
                        { scaleY },
                    ],
                },
            ] }),
        React.createElement(Animated.View, { style: [
                styles.marginIndicator,
                { width: marginBarSize, height: containerHeight },
                {
                    transform: [
                        { translateY: translateY },
                        { translateX: right.animatedValue.current },
                        { scaleY },
                    ],
                },
            ] }),
        showGrid && (React.createElement(React.Fragment, null,
            React.createElement(Animated.View, { style: [
                    styles.centerIndicators,
                    { width: centerBarSize, height: containerHeight },
                    {
                        transform: [
                            { translateY: translateY },
                            {
                                translateX: Animated.add(left.animatedValue.current, verticalBarsSpaceBetween),
                            },
                            { scaleY },
                        ],
                    },
                ] }),
            React.createElement(Animated.View, { style: [
                    styles.centerIndicators,
                    { width: centerBarSize, height: containerHeight },
                    {
                        transform: [
                            { translateY: translateY },
                            {
                                translateX: Animated.add(left.animatedValue.current, Animated.multiply(verticalBarsSpaceBetween, 2)),
                            },
                            { scaleY },
                        ],
                    },
                ] }))),
        React.createElement(Animated.View, { style: [
                styles.marginIndicator,
                { height: marginBarSize, width: containerWidth },
                {
                    transform: [
                        {
                            translateY: Animated.subtract(top.animatedValue.current, marginBarSize),
                        },
                        { translateX: translateX },
                        { scaleX },
                    ],
                },
            ] }),
        React.createElement(Animated.View, { style: [
                styles.marginIndicator,
                { height: marginBarSize, width: containerWidth },
                {
                    transform: [
                        { translateY: bottom.animatedValue.current },
                        { translateX: translateX },
                        { scaleX },
                    ],
                },
            ] }),
        showGrid && (React.createElement(React.Fragment, null,
            React.createElement(Animated.View, { style: [
                    styles.centerIndicators,
                    { height: centerBarSize, width: containerWidth },
                    {
                        transform: [
                            {
                                translateY: Animated.add(top.animatedValue.current, horizontalBarsSpaceBetween),
                            },
                            { translateX: translateX },
                            { scaleX },
                        ],
                    },
                ] }),
            React.createElement(Animated.View, { style: [
                    styles.centerIndicators,
                    { height: centerBarSize, width: containerWidth },
                    {
                        transform: [
                            {
                                translateY: Animated.add(top.animatedValue.current, Animated.multiply(horizontalBarsSpaceBetween, 2)),
                            },
                            { translateX: translateX },
                            { scaleX },
                        ],
                    },
                ] })))));
};
export default forwardRef(Indicators);
//# sourceMappingURL=indicators.js.map