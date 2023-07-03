import { FramesXY, NativeEvent, ScaleFrame, SharedValue, TranslationXY } from './types';
export declare const useScaleFrame: () => [(scale: number) => ScaleFrame, () => void];
export declare const usePanTranslationFrame: (initial?: Partial<{
    x: number;
    y: number;
}> | undefined) => [(t: TranslationXY) => FramesXY, (values?: Partial<{
    x: number;
    y: number;
}> | undefined) => void];
export declare const useGestureEvent: (func: (event: NativeEvent) => void) => {
    onHandlerStateChange: (event: NativeEvent) => void;
    onGestureEvent: (event: NativeEvent) => void;
};
export declare const useSharedValue: (i: number) => [SharedValue];
export declare const useTimeout: (delay: number) => [(fn: () => void) => void, () => void, () => void];
