import React, { forwardRef, useImperativeHandle, useState, } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles';
const Footer = ({ onCancel, onDone, onReset, cancelText, doneText, cancelStyles, doneStyles, cancelTextStyles, doneTextStyles }, ref) => {
    const hitSlop = { top: 10, left: 10, right: 10, bottom: 10 };
    const [resetActive, setResetActive] = useState(false);
    useImperativeHandle(ref, () => ({
        setDoneActive: () => { },
        setResetActive: (state) => {
            setResetActive(state);
        },
    }));
    console.log(cancelStyles);
    return (React.createElement(View, { style: styles.footerContainer },
        React.createElement(TouchableOpacity, { hitSlop: hitSlop, style: cancelStyles, onPress: onCancel },
            React.createElement(Text, { style: [(cancelTextStyles == undefined) ? styles.defaultText : cancelTextStyles] }, cancelText)),
        // resetActive && (React.createElement(TouchableOpacity, { hitSlop: hitSlop, onPress: onReset },
        //     React.createElement(Text, { style: [styles.defaultText, styles.resetText, styles.activeText] }, "Reset"))),
        React.createElement(TouchableOpacity, { hitSlop: hitSlop, onPress: onDone, style: doneStyles },
            React.createElement(Text, { style: [(doneTextStyles == undefined) ? styles.defaultText : doneTextStyles] }, doneText))));
};
export default forwardRef(Footer);
//# sourceMappingURL=index.js.map