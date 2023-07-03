import React from 'react';
import { ImageHandler, PositionLayout } from '../../types';
interface ImageProps {
    uri: string;
    onImageDone: (layout: PositionLayout) => void;
    onImageMove: () => void;
    cropBoxRefs: Array<React.Ref<any>>;
    maxScale?: number;
}
declare const _default: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<ImageHandler>>;
export default _default;
