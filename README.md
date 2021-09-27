# prosemirror-tauri

This is an experiment to try using the [ProseMirror editor widget](prosemirror.net) with the [Tauri application
framework](https://tauri.studio/). 

Tauri is similar to Electron in that it lets you build native application using web technologies for the front end. It's
different in details though. Most interestingly (to me) is that it's based on Rust, using it for the interface between
the "web stuff" and the rest of the system.

## Quickstart

First install the node deps:
```
npm install
```

Then build the UI distribution:
```
npm run build
```

The next step is to build the Tauri application. To do this you'll need to [install
Tauri](https://tauri.studio/en/docs/getting-started/intro). With that in place you can build and run the
application with:
```
npm run tauri dev
```

Note that this can take a few minutes as rust builds all of the dependencies.

You can build the "release" configuration with:
```
npm run tauri build
```

In both cases, the executable is in `src-tauri/target/{debug,release}/app`.

## How it's put together

### Rust/tauri code

The Rust code lives in `src-tauri`. Right now this is completely unchanged from what Tauri's 'quick start'
tool produced. The `tauri.conf.json` files configures it, and the most important part of this file is probably the `build/distDir` setting which tells Tauri where the web-based UI stuff lives (i.e. the `dist` directory).

### HTML/JS/CSS stuff

The web UI is straight HTML/CSS/JS, bundled with [webpack](https://webpack.js.org/). When you build the UI stuff, it's bundled into the `dist` directory where Tauri looks for it. So remember to re-bundle your UI stuff before building the Tauri app.
