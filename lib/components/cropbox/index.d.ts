import React from 'react';
import { LayoutRectangle } from 'react-native';
import { CropBoxDoneEventProps, CropBoxHandler } from '../../types';
interface CropBoxProps {
    onCropBoxDone: (p: CropBoxDoneEventProps) => void;
    updateImageBounderies: (p: LayoutRectangle) => void;
    cropBoxRefs: Array<React.Ref<any>>;
    lockedAspectRatio: boolean;
    rounded?: boolean;
}
declare const _default: React.ForwardRefExoticComponent<CropBoxProps & React.RefAttributes<CropBoxHandler>>;
export default _default;
