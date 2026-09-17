# UI System Design & Rendering Optimization

## 1. Zero-CLS Strategy
- Explicit aspect-ratio reservations for asynchronous media.
- Pre-allocation of skeleton container dimensions before network payloads arrive.

## 2. Paint & Composite Layer Optimization
- Dynamic animations leverage transform and opacity exclusively to offload calculations to the GPU composite layer without triggering layout reflows.
- Passive event listeners applied to scroll and touch cycles to keep the browser main thread unblocked.
