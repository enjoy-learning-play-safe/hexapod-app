# Hexapod-app

[https://github.com/enjoy-learning-play-safe/hexapod-app/releases/latest](Download App)

[![Build Executables](https://github.com/enjoy-learning-play-safe/hexapod-app/actions/workflows/build.yml/badge.svg)](https://github.com/enjoy-learning-play-safe/hexapod-app/actions/workflows/build.yml)

💻 &nbsp; Cross-platform electron app for controlling Hexapod.

💬 &nbsp; Check out the official blog for the Hexapod project: [https://blogs.ntu.edu.sg/ps9888-2021-g03/](https://blogs.ntu.edu.sg/ps9888-2021-g03/)

🗳 &nbsp; If something doesn't work, please [file an issue](https://github.com/enjoy-learning-play-safe/hexapod-app/issues/new).

## Releases:

✨ &nbsp; Grab the latest (and greatest) release here: [https://github.com/enjoy-learning-play-safe/hexapod-app/releases/latest](https://github.com/enjoy-learning-play-safe/hexapod-app/releases/latest)

💽 &nbsp; All releases are available here: [https://github.com/enjoy-learning-play-safe/hexapod-app/releases](https://github.com/enjoy-learning-play-safe/hexapod-app/releases)

🚀 &nbsp; Built and released with Github Actions!

## Getting started

```sh
git clone https://github.com/enjoy-learning-play-safe/hexapod-app.git
```

Then install all the `node_modules` needed by executing the following commands:

```sh
cd hexapod-app
yarn install
```

Finally execute the following command to start Webpack in development mode and
watch the changes on source files for live rebuild on code changes.

```sh
yarn run quickstart
```

If you want to make sure that there are no cache issues, run this instead of `quickstart`:

```sh
yarn run quickstart:freshen
```

## Building the installer for your Electron app

The boilerplate is currently configured to package & build the installer of
your app for macOS & Windows using `electron-builder`.

To build all supported configurations:

```sh
yarn run quickbuild
```

For macOS, execute:

```sh
yarn run prod
yarn run build:mac
```

For Windows, execute:

```sh
yarn run prod
yarn run build:win
```

### Extra options

The build scripts are pre-configured to build 64 bit installers since 64 bit
should be the standard for a modern applications. 32 bit builds are still
possible by changing the build scripts in `package.json` as below:

```jsonc
// from
"scripts": {
    ...
    "build:win": "electron-builder build --win --x64",
    "build:mac": "electron-builder build --mac --x64"
},

// to
"scripts": {
    ...
    "build:win": "electron-builder build --win --ia32",
    // Works only on macOS version < 10.15
    "build:mac": "electron-builder build --mac --ia32"
},
```

Builds for Linux, armv71, and arm64 can also be configured by modifying the
build scripts in `package.json`, but those aren't tested yet. For details,
please refer to [documents of `electron-builder`](https://www.electron.build/cli).

## Known issues

1. As Apple introduced the [notarization requirements] with the public release
   of `macOS 10.14.5`, apps built for `macOS` are now needed to be signed with
   a valid Developer ID certificate and let Apple notarizes it for you. This
   boilerplate doesn't include the notarization setup as of the `3.0.0` release,
   but up until now, you should still be able to run your Electron app by
   allowing your app to be opened in `System Preferences -> Security & Privacy -> General` without notarizing it for still (tested on `macOS 11.1`).

   If you want to notarization your app using this boilerplate before those
   settings are included in the future updates, you can try follow the guides on
   issue [electron-builder #3870].

2. [`electron-builder@22.10.4`] added Apple Silicon and universal binary
   supports, but it's still a pre-release instead of a stable one so the one
   included in this boilerplate is still staying on `22.9.1` which doesn't
   support building the universal binary yet.

## Author

Enjoy Learning Play Safe  
Github: [@enjoy-leaning-play-safe](https://github.com/enjoy-learning-play-safe)

## License

[Licensed as MIT](LICENSE).
