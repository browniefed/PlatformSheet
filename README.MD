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