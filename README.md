# boydog-demo

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/boydoglabs/boydog-demo)
[![Build Status](https://travis-ci.org/boydoglabs/boydog-demo.png?branch=master)](https://travis-ci.org/boydoglabs/boydog-demo)

A demo page running on BoyDog (real-time collaborative web framework). This is basically the landing page at [boy.dog](http://boy.dog/).
You can use this as your starting boilerplate for your real-time collaborative projects.

Status: Alpha

## Getting started

 - `git clone https://github.com/boydoglabs/boydog-demo`
 - `npm install`
 - `npm start`
 - Browse localhost:3090 from two different computers or mobile devices.

## Realtime directives

 - dog-value: Binds `<input>` value.
 - dog-html: Bind element inner HTML.
 - dog-id: Bind tag id (not supported yet, contributions welcome)
 - dog-class: Bind tag classes (not supported yet, contributions welcome)

## BoyDog monitor

BoyDog automatically creates a route to monitor all changes users make. Browse the *boydog-monitor* at the URL provided in the console log when you run `npm start`. This allows you to monitor user's input real-time. It has admin privileges and changes made through this page will be sent to connected users.

## Contributing

There are 4 different repositories:

 - [boydog](https://github.com/boydoglabs/boydog): The server module, handles OT, auth, and creates the boydog-monitor.
 - [boydog-client](https://github.com/boydoglabs/boydog-client): The client module, handles OT for the users, is in charge of updating HTML elements with the latest value from the server.
 - [sharedb-attribute-binding](https://github.com/adelriosantiago/sharedb-attribute-binding): A custom-made ShareDB binding that allows you to sync element attributes like id, class, href, etc.
 - This repository: It is a demo showcasing all BoyDog capabilities. This is always running at [boy.dog](http://www.boy.dog). For simplicity all development is also made here, therefore if you want to start a new project **or** develop a new feature just clone this repository.

All these modules can be found inside the "git_modules" of this repo. To help you do changes easily do `npm run dev` to install these modules and automatically restart server on file changes.

Run e2e tests with `npm run test`. Note that for some unknown reason some Travis tests sometimes fail. This issue is probably related to the BoyDog monitor having enough time to lauch.

## License

[MIT] © boy.dog