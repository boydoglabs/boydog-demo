# boydog-demo

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/boydoglabs/boydog-demo)
[![Build Status](https://travis-ci.org/boydoglabs/boydog-demo.png?branch=master)](https://travis-ci.org/boydoglabs/boydog-demo)

BoyDog is a framework for building ultra-fast, real-time collaborative web applications. BoyDog uses ShareDB's OT (operational transforms) to keep data consistent even if multiple users are editing the same text at the same time.

![](https://raw.githubusercontent.com/boydoglabs/boydog-demo/master/sample.gif)
Demo: [www.boy.dog](http://www.boy.dog/).

You can use this repository as your starting boilerplate for your real-time collaborative projects.

## Running this demo

 - `git clone https://github.com/boydoglabs/boydog-demo`
 - `npm install`
 - `npm start`
 - Browse localhost:3090 from two different computers.

## Running e2e tests

Do `npm run test`. Make sure the project is already running at 3090.

## Contributing

 - [boydog](https://github.com/boydoglabs/boydog): The server module, handles OT, auth, and creates the boydog-monitor.
 - boydog-demo (this repository): A demo showcasing all BoyDog capabilities. This is what you see  at [boy.dog](http://www.boy.dog). For simplicity all development is also made here. If you want to start a new project **or** develop a new feature clone this repository.
 - [sharedb-attribute-binding](https://github.com/adelriosantiago/sharedb-attribute-binding): A custom-made ShareDB binding that allows you to sync element attributes like id, class, href, etc.

## Changelog

 - 2.X.X: Removed Puppeteer. Huge space improvements over previous version. Module 'boydog-client' no longer needed. Client module automatically starts and now there is no need to initialize it manually.
 - 1.X.X: Initial alpha realease.

## License

[MIT] © boy.dog