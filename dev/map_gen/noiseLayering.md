The higher the layer index, the less important it is so the smaller the multiplier is.  
  
### Calculation is done like follows:  
```js
Input1:     0.3
Input2:     0.5
Multiplier: 1.0

Result = Input1 + (abs(Input1 - Input2) / Multiplier)
```
  
<br><br>

### Example layer calculation:  

| # | Value 1 | Value 2 | Value 3 | Layer Multiplier |
| --- | --- | --- | --- | --- |
| Layer 1 | 0.5 | 0.6 | 0.3 | 1.0 |
| Layer 2 | 0.6 | 0.8 | 0.6 | 0.5 |
| Layer 3 | 0.7 | 0.8 | 0.7 | 0.25 |
| **Result** | 0.587 | 0.725 | 0.513 |  |
