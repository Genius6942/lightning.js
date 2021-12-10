-# zap.js
Creates lightning.

# Use:

### html:
```html
<script src = 'https://genius6942.github.io/lightning.min.js/lightning.js'></script>
<script>
 	var boom = new Lightning({x: 1, y: 1}, {x: 300, y: 300});
</script>
```

### es6:
```javascript
import Lightning from 'https://genius6942.github.io/lightning.module.js/lightning.js';
var boom = new Lightning({x: 1, y: 1}, {x: 300, y: 300});
```

## Parameters:
- p1 `object`: start point of lightning, expressed as `{x: m, y: n}`
- p2  `object`: end point of lighting, expressed as `{x: m, y: n}`
- options `object`:
	- thickness `number`: width of lightning. Defaults to `4`
	- fadeTime `number`: time it takes for the lightning to fade. Defaults to `Infinity`
	- range `number`: How far from the straight line path the lighting can get. Defaults to `50`
	- stepLength `number`: vertical distance between each point on the lightning when generated. Defautls to `4`
	- changeRate `number`: max horizontal distance between two points on the bolt. Defaults to `4`


## You can view a live demo [here](https://genius6942.github.io/lightning.js/example.html)
