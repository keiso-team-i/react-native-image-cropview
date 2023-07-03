import React, { createRef, forwardRef, useImperativeHandle, useRef, useState, } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { maximumAvailableScale } from '../config';
import styles from '../styles';
import { createAspectRatioRectangle, measureInWindow, resize } from '../utils';
import Cropbox from './cropbox';
import Footer from './footer';
import Image from './image';
const Cropper = ({ uri, onCancel, onDone, onReset, aspectRatio, rounded, scaleMax, hideFooter, getImageSize, cancelText, doneText, cancelStyles, doneStyles, cancelTextStyles, doneTextStyles }, ref) => {
    const containerRef = useRef(null);
    const footerRef = useRef(null);
    const cropboxRef = useRef(null);
    const imageRef = useRef(null);
    const originalImageScale = useRef(1);
    const cropBoxRefs = useRef(Array(8).fill(createRef()));
    const initialOnLayoutWasCalled = useRef(false);
    const previousSizes = useRef();
    const [initialMeasures, setInitialMeasures] = useState();
    useImperativeHandle(ref, () => ({
        done: () => onFooterDone(),
        reset: () => onFooterReset(),
        cancel: () => onFooterCancel(),
    }));
    // Used to initiate the cropper after everything was rendered
    const onContainerLayout = (event) => {
        var _a, _b, _c;
        const { width, height } = event.nativeEvent.layout;
        if (!initialOnLayoutWasCalled.current) {
            initialOnLayoutWasCalled.current = true;
            setInitialMeasures(event.nativeEvent.layout);
            initCropper(event.nativeEvent.layout);
        }
        // we have a device rotation
        if (width !== ((_a = previousSizes.current) === null || _a === void 0 ? void 0 : _a.width) &&
            height !== ((_b = previousSizes.current) === null || _b === void 0 ? void 0 : _b.height)) {
            previousSizes.current = {
                width: width,
                height: height,
            };
            (_c = cropboxRef.current) === null || _c === void 0 ? void 0 : _c.updateCropperToFitInsideContainer(event.nativeEvent.layout);
        }
    };
    /**
     * 1. Find the cropbox size to fit inside the container, by aspect ratio
     *    or original aspect ratio of the image
     * 2. Resize the image to fit inside the cropper and cover the entire space
     */
    const initCropper = async (measures) => {
        var _a, _b, _c, _d;
        const imageSize = await getImageSize(uri);
        const resizeRatio = imageSize.width / imageSize.height;
        const aspectRatioMeasures = createAspectRatioRectangle({
            width: measures.width,
            height: measures.height,
            aspectRatio: getAspectRatio(resizeRatio),
        });
        // resize the aspectRatioMeasures to fit inside the container
        const cropBoxSize = resize({
            containerWidth: measures.width,
            containerHeight: measures.height,
            width: aspectRatioMeasures.width,
            height: aspectRatioMeasures.height,
            resizeMode: 'contain',
        });
        // Get the position of the cropper inside the container.
        // Try to center inside the container
        const cropperX = (measures.width - cropBoxSize.width) / 2;
        const cropperY = (measures.height - cropBoxSize.height) / 2;
        (_a = cropboxRef.current) === null || _a === void 0 ? void 0 : _a.resetTo({
            top: cropperY,
            bottom: cropperY + cropBoxSize.height,
            left: cropperX,
            right: cropperX + cropBoxSize.width,
            containerLayout: measures,
        });
        (_b = imageRef.current) === null || _b === void 0 ? void 0 : _b.setCropboxLayout({
            x: cropperX,
            y: cropperY,
            width: cropBoxSize.width,
            height: cropBoxSize.height,
        });
        // resize the image to fit inside the cropbox
        const resizedImage = resize({
            containerWidth: cropBoxSize.width,
            containerHeight: cropBoxSize.height,
            width: imageSize.width,
            height: imageSize.height,
            resizeMode: 'cover',
        });
        // Save the original image scale to be used on crop done
        originalImageScale.current = resizedImage.scale;
        // Get the position of the image inside the container
        const imageX = (measures.width - resizedImage.width) / 2;
        const imageY = (measures.height - resizedImage.height) / 2;
        (_c = cropboxRef.current) === null || _c === void 0 ? void 0 : _c.setImageLayout({
            left: imageX,
            top: imageY,
            bottom: imageY + resizedImage.height,
            right: imageX + resizedImage.width,
        });
        (_d = imageRef.current) === null || _d === void 0 ? void 0 : _d.resetTo({
            x: imageX,
            y: imageY,
            scale: 1,
            width: resizedImage.width,
            height: resizedImage.height,
        });
    };
    // try to sync the values between cropbox and image in realtime
    // and not on event done.
    const updateImageBounderies = (bounderies) => {
        var _a;
        (_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.setCropboxLayout(bounderies);
    };
    const updateImageZoomAndBounderis = (cropBoxLayout) => {
        var _a, _b;
        (_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.setCropboxLayout(cropBoxLayout);
        (_b = imageRef.current) === null || _b === void 0 ? void 0 : _b.pinchToZoom(cropBoxLayout);
        onCropperWasChanged();
    };
    const updateCropboxLayoutBounderies = (imageLayout) => {
        var _a;
        (_a = cropboxRef.current) === null || _a === void 0 ? void 0 : _a.setImageLayout(imageLayout);
        onCropperWasChanged();
    };
    const onFooterReset = async () => {
        var _a, _b;
        (_a = footerRef.current) === null || _a === void 0 ? void 0 : _a.setResetActive(false);
        (_b = footerRef.current) === null || _b === void 0 ? void 0 : _b.setDoneActive(false);
        const measures = await measureInWindow(containerRef);
        initCropper(measures);
        onReset && onReset();
    };
    const onFooterCancel = () => {
        onCancel && onCancel();
    };
    const onFooterDone = () => {
        var _a;
        if (imageRef.current) {
            const layout = (_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.getCropArea();
            onDone &&
                onDone({
                    x: layout.x / originalImageScale.current,
                    y: layout.y / originalImageScale.current,
                    width: layout.width / originalImageScale.current,
                    height: layout.height / originalImageScale.current,
                });
        }
    };
    const onCropperWasChanged = () => {
        var _a, _b;
        (_a = footerRef.current) === null || _a === void 0 ? void 0 : _a.setDoneActive(true);
        (_b = footerRef.current) === null || _b === void 0 ? void 0 : _b.setResetActive(true);
    };
    const lockedAspectRatio = () => {
        return !!aspectRatio || !!rounded;
    };
    const getAspectRatio = (ratio) => {
        let expectedRatio = ratio;
        if (aspectRatio && aspectRatio !== 'original') {
            expectedRatio = aspectRatio;
        }
        if (rounded) {
            expectedRatio = 1;
        }
        return expectedRatio;
    };
    const getscaleMax = () => {
        if (scaleMax && scaleMax <= maximumAvailableScale && scaleMax >= 3) {
            return scaleMax;
        }
        return 10;
    };
    return (React.createElement(GestureHandlerRootView, { style: styles.rootView },
        React.createElement(View, { onLayout: onContainerLayout, ref: containerRef, style: [styles.cropperContainer] }, initialMeasures && (React.createElement(React.Fragment, null,
            React.createElement(Cropbox, { ref: cropboxRef, cropBoxRefs: cropBoxRefs.current, onCropBoxDone: updateImageZoomAndBounderis, updateImageBounderies: updateImageBounderies, lockedAspectRatio: lockedAspectRatio(), rounded: rounded }),
            React.createElement(Image, { ref: imageRef, cropBoxRefs: cropBoxRefs.current, uri: uri, onImageDone: updateCropboxLayoutBounderies, onImageMove: () => { var _a; return (_a = cropboxRef.current) === null || _a === void 0 ? void 0 : _a.holdAnimations(); }, maxScale: getscaleMax() })))),
        !hideFooter && (React.createElement(Footer, { ref: footerRef, onDone: onFooterDone, onCancel: onFooterCancel, onReset: onFooterReset, cancelStyles: cancelStyles, doneStyles: doneStyles, cancelText: cancelText, doneText: doneText, cancelTextStyles: cancelTextStyles, doneTextStyles: doneTextStyles }))));
};
export default forwardRef(Cropper);
//# sourceMappingURL=Cropper.js.map