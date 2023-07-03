import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
export const useScaleFrame = () => {
    const diffThisFrame = useRef(1);
    const prevValue = useRef(1);
    const reset = () => {
        prevValue.current = 1;
    };
    const update = (scale) => {
        diffThisFrame.current = scale / prevValue.current;
        prevValue.current = scale;
        return {
            scaleFrame: diffThisFrame.current,
        };
    };
    return [update, reset];
};
export const usePanTranslationFrame = (initial) => {
    const diffThisFrame = useRef({ framesX: 0, framesY: 0 });
    const prevValue = useRef({
        x: (initial === null || initial === void 0 ? void 0 : initial.x) || 0,
        y: (initial === null || initial === void 0 ? void 0 : initial.y) || 0,
    });
    const reset = (values) => {
        prevValue.current = {
            x: (values === null || values === void 0 ? void 0 : values.x) || 0,
            y: (values === null || values === void 0 ? void 0 : values.y) || 0,
        };
    };
    const update = ({ translationX, translationY }) => {
        diffThisFrame.current = {
            framesX: translationX - prevValue.current.x,
            framesY: translationY - prevValue.current.y,
        };
        prevValue.current = {
            x: translationX,
            y: translationY,
        };
        return diffThisFrame.current;
    };
    return [update, reset];
};
export const useGestureEvent = (func) => {
    const gestureEvent = (event) => {
        func && func(event);
    };
    return {
        onHandlerStateChange: gestureEvent,
        onGestureEvent: gestureEvent,
    };
};
export const useSharedValue = (i) => {
    const sharedValue = useRef(i);
    const animatedValue = useRef(new Animated.Value(i));
    const setAnimatedValue = (n) => {
        animatedValue.current.setValue(n);
    };
    const setValue = (n) => {
        sharedValue.current = n;
    };
    return [
        {
            value: sharedValue,
            animatedValue: animatedValue,
            setAnimatedValue,
            setValue,
        },
    ];
};
export const useTimeout = (delay) => {
    // eslint-disable-next-line no-undef
    const timerId = useRef();
    const func = useRef();
    const startTimer = (fn) => {
        func.current = fn;
        timerId.current = setTimeout(func.current, delay);
    };
    const resetTimer = () => {
        clearTimer();
        !!func.current && startTimer(func.current);
    };
    const clearTimer = () => {
        if (timerId.current) {
            clearTimeout(timerId.current);
        }
    };
    useEffect(() => {
        ;
        () => clearTimer();
    }, []);
    return [startTimer, clearTimer, resetTimer];
};
//# sourceMappingURL=hooks.js.map