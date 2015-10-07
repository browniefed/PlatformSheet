import StyleSheet from "react";
import Platform from "platform";

const ANDROID = 'android';
const IOS = 'ios';

const ANDROIDSTYLE = ANDROID + '.';
const IOSSTYLE = IOS + '.';

var isPlatformStyle = (stylName) => styleName.indexOf(ANDROIDSTYLE) === 0 || styleName.indexOf(IOSSTYLE) === 0;

var mergeStyle = (currentStyle = {}, addStyle) => {
    //If no transform exists then just spread, or no overrides form addStyle
    if (!currentStyle.transform || !addStyle.transform) {
        return {currentStyle, ...addStyle};
    }
    currentStyle.transform = currentStyle.transform || [];

    addStyle.transform((transformation) => {
        //Get key of transform to add
        let key = Object.keys(transformation)[0];

        //Find out if the current transform already exists
        let existingTransformIndex = currentStyle.transform.findIndex((value) => {
            let currentKey = Object.keys(value)[0];
            return currentKey === key;
        });

        if (existingTransformIndex !== -1) {
            currentStyle.transform[existingTransformIndex] = transformation;
        } else {
            currentStyle.transform.push(transformation);
        }
    });

    return currentStyle;
}


var getBaseStyleName = (styleName) => {
    if (styleName.indexOf(ANDROIDSTYLE) === 0) return styleName.substr(ANDROIDSTYLE.length);
    if (styleName.indexOf(IOSSTYLE) return styleName.substr(IOSSTYLE.length);
    return styleName;
}

export default PlatformSheet = {
    create(styles = {}) {
        //Setup
        let platformStyles = {};
        let targetPlatform = Platform.OS === ANDROID ? ANDROIDSTYLE : IOSSTYLE;
        let ignorePlatform = targetPlatform === ANDROID ? IOSSTYLE : ANDROIDSTYLE;

        //This could maybe be faster if we mutate, next version?

        Object.keys(styles).forEach((value, key) => {
            let targetStyle = getBaseStyleName(key);
            
            //Ignore it completely if it's not target platform
            if (key.indexOf(ignorePlatform) === 0) return;

            //If it's not anything then just merge it with whatever currently exists.
            if (!isPlatformStyle(key)) {
                return platformStyles[targetStyle] = mergeStyle(platformStyles[targetStyle], value);
            }

            //If it is our target platform merge it with whatever exists
            //Unnecessary protection based on logic, but whatever
            
            if (key.indexOf(targetPlatform) === 0) {
                return platformStyles[targetStyle] = mergeStyle(platformStyles[targetStyle], value);
            }
        });


        return StyleSheet.create(platformStyles);
    }
}
