# Web components

To build components and start app - run:

```
yarn && yarn serve-static
```

## Thoughts on implementing
- Included babel to support ES6 syntax and polyfills for older browsers.
- Monorepo and Lerna used to run scripts simultaneously;
- Each component has similar setup approach - create a class, extend HTMLElement, add shadow root, add styles, add template, add event listeners, add connectedCallback and disconnectedCallback methods;
- Rest of the code is pretty clear I guess, so no need for extra comments;


## Things this App don't do
- Missing package containing shared configs (e.g. webpack) for rest of the packages;
- Missing appropriate styles or tests due to a lack of time. For end-to-end testing, I would probably use Cypress;
- Tried to use Angular to create `display-data` component, but due to issues with bundled files switched back to Vanilla JS (didn't want to spend a lot of time on investigation);