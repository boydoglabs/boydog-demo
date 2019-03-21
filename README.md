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
 - Browse the *boydog-monitor* at the URL provided in the console log.

Develop with `npm run dev` to automatically restart server on file changes, including submodules inside "git_modules".

Run e2e tests with `npm run test`.

## Realtime directives

 - dog-value: Binds `<input>` value.
 - dog-html: Bind element inner HTML.
 - dog-id: Bind tag id (not supported yet, contributions welcome)
 - dog-class: Bind tag classes (not supported yet, contributions welcome)

## License

[MIT] © boy.dog