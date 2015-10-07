"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _platform = require("platform");

var _platform2 = _interopRequireDefault(_platform);

var ANDROID = 'android';
var IOS = 'ios';

var isPlatformStyle = function isPlatformStyle(stylName) {
    return styleName.indexOf(ANDROID) === 0 || styleName.indexOf(IOS) === 0;
};

var mergeStyle = function mergeStyle(currentStyle, addStyle) {
    if (currentStyle === undefined) currentStyle = {};

    //If no transform exists then just spread, or no overrides form addStyle
    if (!currentStyle.transform || !addStyle.transform) {
        return _extends({ currentStyle: currentStyle }, addStyle);
    }
    currentStyle.transform = currentStyle.transform || [];

    addStyle.transform(function (transformation) {
        //Get key of transform to add
        var key = Object.keys(transformation)[0];

        //Find out if the current transform already exists
        var existingTransformIndex = currentStyle.transform.findIndex(function (value) {
            var currentKey = Object.keys(value)[0];
            return currentKey === key;
        });

        if (existingTransformIndex !== -1) {
            currentStyle.transform[existingTransformIndex] = transformation;
        } else {
            currentStyle.transform.push(transformation);
        }
    });

    return currentStyle;
};

var getBaseStyleName = function getBaseStyleName(styleName) {
    if (styleName.indexOf(ANDROID) === 0) return styleName.substr(ANDROID.length);
    if (styleName.indexOf(IOS) === 0) return styleName.substr(IOS.length);
    return styleName;
};

exports["default"] = PlatformSheet = {
    create: function create() {
        var styles = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        //Setup
        var platformStyles = {};
        var targetPlatform = _platform2["default"].OS;
        var ignorePlatform = targetPlatform === ANDROID ? IOS : ANDROID;

        //This could maybe be faster if we mutate, next version?

        Object.keys(styles).forEach(function (value, key) {
            var targetStyle = getBaseStyleName(key);

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

        return _react2["default"].create(platformStyles);
    }
};
module.exports = exports["default"];
