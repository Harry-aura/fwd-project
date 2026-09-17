# Frontend Engineering Interview Defense Guide

### Q1: What is the advantage of vanilla JS architecture over single-page frameworks (React/Vue)?
> **Answer**: Zero bundle parsing overhead, instant cold boot times, and absence of virtual DOM reconciliation diffing costs. For content and widget-oriented portals, vanilla JavaScript delivers maximum Lighthouse performance scores (99-100) on low-powered mobile devices.

### Q2: How do you prevent layout thrashing in manual DOM manipulation?
> **Answer**: By batching DOM reads (getBoundingClientRect(), offsetWidth) together and batching DOM writes (classList.add(), innerHTML) together, rather than alternating between reads and writes within the same animation frame.

### Q3: How is responsive design managed without UI CSS framework bloat?
> **Answer**: By defining central CSS Custom Properties (:root { --spacing-md: clamp(1rem, 2.5vw, 2rem); }) and utilizing CSS Grid auto-fit with minmax() boundaries.
