# boydog-demo

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/boydoglabs/boydog-demo)
[![Build Status](https://travis-ci.org/boydoglabs/boydog-demo.png?branch=master)](https://travis-ci.org/boydoglabs/boydog-demo)

BoyDog is a framework for building ultra-fast, real-time collaborative web applications. See [www.boy.dog](http://www.boy.dog/).

![](https://raw.githubusercontent.com/boydoglabs/boydog-demo/master/sample.gif)

You can use this repository as your starting boilerplate for your real-time collaborative projects.

*Status: Beta*

## Running this demo

 - `git clone https://github.com/boydoglabs/boydog-demo`
 - `npm install`
 - `npm start`
 - Browse localhost:3090 from two different computers or mobile devices.

## Realtime directives

 - bd-value: Binds `<input>` value.
 - bd-html: Bind element inner HTML.
 - bd-id: Bind tag id
 - bd-class: Bind tag classes

Examples:
 - `<input bd-value="editor">`
 - `<p class="alert" bd-html="alertInfo"></p>`
 - `<p bd-class="alert.class" bd-html="alert.info"></p>`

See more examples at the [demo page](http://www.boy.dog/).

## Contributing
 - [boydog](https://github.com/boydoglabs/boydog): The server module, handles OT, auth, and creates the boydog-monitor.
 - boydog-demo (this repository): A demo showcasing all BoyDog capabilities. This is what you see  at [boy.dog](http://www.boy.dog). For simplicity all development is also made here. If you want to start a new project **or** develop a new feature clone this repository.
 - [sharedb-attribute-binding](https://github.com/adelriosantiago/sharedb-attribute-binding): A custom-made ShareDB binding that allows you to sync element attributes like id, class, href, etc.

## Roadmap:

 - [x] Travis tests
 - [x] Alpha release
 - [ ] Implement server middleware
 - [ ] Allow users to see where other users are
 - [ ] Implement plug-in system for extensibility
 - [ ] Create `bd-for="n"` directive to create and bind `n` elements

## Changelog

 - 2.X.X: Removed Puppeteer. Huge space improvements over previous version. Module 'boydog-client' no longer needed. Client module automatically starts and now there is no need to initialize it manually.
 - 1.X.X: Initial alpha realease.

## License

[MIT] © boy.dog