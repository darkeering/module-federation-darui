// window.addEventListener('popstate', () => {
//   console.log(111);

// })

// const rawPushState = window.history.pushState

// window.history.pushState = (...args) => {
//   rawPushState.apply(window.history.pushState, args)
//   console.log(222);

// }

// const rawReplaceState = window.history.replaceState

// window.history.replaceState = (...args) => {
//   rawReplaceState.apply(window.history.replaceState, args)
//   console.log(333);

// }

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
