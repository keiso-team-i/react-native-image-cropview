import React from 'react';
import { LayoutRectangle } from 'react-native';
import { CropperHandler, ScaleRange } from '../types';
export interface CropperProps {
    /**
     * Show the image specified by the URI param.
     */
    uri: string;
    /**
     * A method to provide the original image width and height to the cropper.
     * Feel free to use any method to get the original image width and height;
     * Example: https://www.npmjs.com/package/react-native-image-size
     */
    getImageSize: (uri: string) => Promise<{
        width: number;
        height: number;
    }>;
    /**
     * When done button is pressed; Returns x, y, width, height of the crop rectangle
     */
    onDone: (layout: LayoutRectangle) => void;
    /**
     * (Optional) on cancel button press
     */
    onCancel?: () => void;
    /**
     * (Optional) on reset button press
     */
    onReset?: () => void;
    /**
     * (Optional) desired aspect ratio of the crop area;
     * If nothing is provided the crop area is free; If you want to preserve the original
     * aspect ratio only send "original" as aspectRatio prop
     *
     * Example: original(x:x), 4/3, 2/3, 16/9
     */
    aspectRatio?: 'original' | number;
    /**
     * (Optional) add round crop indicator and keep aspect ratio to 1
     */
    rounded?: boolean;
    /**
     * (Optional) Maximum image scale. Default 10x.
     *
     * Example: scaleMax={3} where scaleMax <= 15 && scaleMax >= 3
     */
    scaleMax?: ScaleRange;
    /**
     * (Optional) hide all the bottom actions.
     */
    hideFooter?: boolean;
}
declare const _default: React.ForwardRefExoticComponent<CropperProps & React.RefAttributes<CropperHandler>>;
export default _default;
