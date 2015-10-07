# PlatformSheet

Allows you to colocate styles for both IOS an Android.


# Example

```
var styles = PlatformSheet.create({
    
    baseStyle: {
        height: 100,
        width: 100        
    },
    android.baseStyle = {
        backgroundColor: '#000'
    },
    ios.baseStyle = {
        backgroundColor: '#DDD'
    }

})

```

Then just use `styles.baseStyle`

Special-ish handling for `transform`

```
var styles = PlatformSheet.create({
    
    baseStyle: {
        transform: [
            {rotate: '30deg'},
            {scale: 1.5}
        ]
    },
    android.baseStyle = {
        transform: [
            {scale: 2} //overrides 1.5
        ]
    },
    ios.baseStyle = {
        transform: [
            {scale: .5} //overrides 1.5
        ]
    }

})

```
Why you would ever do that I don't know, makes more sense for normal styling/colors vs transforming.