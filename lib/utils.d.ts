import { LayoutRectangle, ScaledSize } from 'react-native';
export declare const measureInWindow: (ref: any) => Promise<LayoutRectangle>;
export declare const resize: ({ resizeMode, containerWidth, containerHeight, width, height, }: {
    resizeMode?: "contain" | "cover" | undefined;
    containerWidth: number;
    containerHeight: number;
    width: number;
    height: number;
}) => {
    width: number;
    height: number;
    scale: number;
};
export declare const createAspectRatioRectangle: ({ width, height, aspectRatio, }: {
    width: number;
    height: number;
    aspectRatio: number;
}) => {
    width: number;
    height: number;
};
export declare const clamp: ({ value, minValue, maxValue, }: {
    value: number;
    minValue: number;
    maxValue: number;
}) => number;
export declare function isIphoneX(): boolean;
export declare function getStatusBarHeight(skipAndroid?: boolean): number;
export declare const getMinCropperSize: ({ width, height, ratio, }: ScaledSize & {
    ratio: number;
}) => {
    width: number;
    height: number;
};
