# boydog-demo

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/boydoglabs/boydog-demo)
[![Build Status](https://travis-ci.org/boydoglabs/boydog-demo.png?branch=master)](https://travis-ci.org/boydoglabs/boydog-demo)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)

BoyDog is a framework for building ultra-fast, real-time collaborative web applications. BoyDog uses ShareDB's OT (operational transformation) to keep data consistent even if multiple users are editing the same text at the same time.
You can use this repository as your starting boilerplate for your real-time collaborative projects.

[![](https://raw.githubusercontent.com/boydoglabs/boydog-demo/master/sample.gif)](http://www.boy.dog/)
Demo: [www.boy.dog](http://www.boy.dog/).

## Getting started

See instructions at [boydog demo](http://www.boy.dog/)

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

## License

[MIT] © boy.dog