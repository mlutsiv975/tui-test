# Web components

To build components and start app - run:

```
yarn serve-static
```

## Thoughts on implementing
- Monorepo and Lerna used to run scripts simultaneously;
- Included babel to support ES6 syntax and polyfills for older browsers.
- Did not add any styles because of time lack, as well as tests coverage. But probably would use Cypress for e2e testing;
- Each component has similar setup approach - create a class, extend HTMLElement, add shadow root, add styles, add template, add event listeners, add connectedCallback and disconnectedCallback methods;
- Tried to use Angular for crate display-data component, but due to issues with bundled files switched back to Vanilla JS (didn't want to spend a lot of time on investigation);
- Rest of the code is pretty clear I guess so no need for extra comments;