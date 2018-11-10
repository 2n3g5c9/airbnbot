# airbnbot-js

[![CircleCI](https://circleci.com/gh/2n3g5c9/airbnbot-js/tree/master.svg?style=svg)](https://circleci.com/gh/2n3g5c9/airbnbot-js/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/71be31ee9871a217f2f5/maintainability)](https://codeclimate.com/github/2n3g5c9/airbnbot-js/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/71be31ee9871a217f2f5/test_coverage)](https://codeclimate.com/github/2n3g5c9/airbnbot-js/test_coverage)

Slack app to fetch deals from Airbnb's API. (JS version)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The simplest way to enjoy this NodeJS application is to run it in a Docker container, so make sure you have Docker CE installed: https://docs.docker.com/install/

### Installation

Clone the repository:

```bash
git clone https://github.com/2n3g5c9/airbnbot-js
```

Then simply build the image (less than 80MB) with the provided build script:

```bash
./airbnbot-build.sh
```

And run it in the background:

```bash
./airbnbot-run.sh
```

## Tech/frameworks used

- [NodeJS](https://nodejs.org/): JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Typescript](https://www.typescriptlang.org/): Typed superset of JavaScript that compiles to plain JavaScript.
- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [Webpack](https://webpack.js.org/): Bundler for javascript and friends.
- [Distroless](https://github.com/GoogleContainerTools/distroless): Language focused docker images, minus the operating system.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
