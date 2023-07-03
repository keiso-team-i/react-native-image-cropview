import { MutableRefObject } from 'react';
import { Animated, LayoutRectangle } from 'react-native';
import { GestureHandlerStateChangeNativeEvent, PanGestureHandlerGestureEvent, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
export declare type TranslationXY = {
    translationX: number;
    translationY: number;
};
export declare type FramesXY = {
    framesX: number;
    framesY: number;
};
export declare type ValueXY = {
    x: number;
    y: number;
};
export declare type ScaleFrame = {
    scaleFrame: number;
};
export declare type PositionLayout = {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export declare type CropBoxDoneEventProps = {
    focalX: number;
    focalY: number;
    translateX: number;
    translateY: number;
    scale: number;
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type CropBoxHandler = {
    setImageLayout: (layout: PositionLayout) => void;
    holdAnimations: () => void;
    updateCropperToFitInsideContainer: (layout: LayoutRectangle) => void;
    resetTo: ({ top, left, right, bottom, containerLayout, }: PositionLayout & {
        containerLayout: LayoutRectangle;
    }) => void;
};
export declare type ImageHandler = {
    setCropboxLayout: (layout: LayoutRectangle) => void;
    pinchToZoom: (props: CropBoxDoneEventProps) => void;
    resetTo: (props: {
        x: number;
        y: number;
        scale: number;
        width: number;
        height: number;
    }) => void;
    getCropArea: () => LayoutRectangle;
};
export declare type FooterHandler = {
    setDoneActive: (state: boolean) => void;
    setResetActive: (state: boolean) => void;
};
export declare type IndicatorHandler = {
    showGrid: (state: boolean) => void;
};
export declare type CropperHandler = {
    done: () => void;
    reset: () => void;
    cancel: () => void;
};
export declare type SharedValue = {
    value: MutableRefObject<number>;
    animatedValue: MutableRefObject<Animated.Value>;
    setAnimatedValue: (n: number) => void;
    setValue: (n: number) => void;
};
export declare enum BoxHandlerTypes {
    None = 0,
    TopLeft = 1,
    TopRight = 2,
    BottomLeft = 3,
    BottomRight = 4,
    Top = 5,
    Left = 6,
    Right = 7,
    Bottom = 8
}
export declare type NativeEvent = GestureHandlerStateChangeNativeEvent & PanGestureHandlerGestureEvent & PinchGestureHandlerGestureEvent;
declare type ClampedBoxValues = {
    min: number;
    max: number;
};
declare type ClampedBoxValuesTypes = 'leftvalues' | 'topvalues' | 'rightvalues' | 'bottomvalues';
export declare type ClampedValues = Record<ClampedBoxValuesTypes, ClampedBoxValues>;
export declare type ScaleRange = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export {};
