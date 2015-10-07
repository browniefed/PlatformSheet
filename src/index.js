import StyleSheet from "react";
import Platform from "platform";

const ANDROID = 'android';
const IOS = 'ios';

var isPlatformStyle = (stylName) => styleName.indexOf(ANDROID) === 0 || styleName.indexOf(IOS) === 0;

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
    if (styleName.indexOf(ANDROID) === 0) return styleName.substr(ANDROID.length);
    if (styleName.indexOf(IOS) === 0) return styleName.substr(IOS.length);
    return styleName;
}

export default PlatformSheet = {
    create(styles = {}) {
        //Setup
        let platformStyles = {};
        let targetPlatform = Platform.OS;
        let ignorePlatform = targetPlatform === ANDROID ? IOS : ANDROID;

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
