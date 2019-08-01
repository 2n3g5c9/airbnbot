<div align="center">
  <img width="512" src="https://raw.githubusercontent.com/2n3g5c9/airbnbot-js/master/img/airbnbot_banner.png" alt="airbnbot-js">
</div>

<br />

<div align="center">Slack app to fetch deals from the hidden Airbnb API (JS version)</div>

<br />

<div align="center">
  <!-- Build Status -->
  <a href="https://circleci.com/gh/2n3g5c9/airbnbot-js/tree/master">
    <img src="https://circleci.com/gh/2n3g5c9/airbnbot-js.svg?style=svg" alt="Build Status" />
  </a>
  <!-- Maintainability Status -->
  <a href="https://codeclimate.com/github/2n3g5c9/airbnbot-js/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/71be31ee9871a217f2f5/maintainability" alt="Maintainability Status" />
  </a>	
  <!-- Test Coverage Status -->
  <a href="https://codeclimate.com/github/2n3g5c9/airbnbot-js/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/71be31ee9871a217f2f5/test_coverage" alt="Maintainability Status" />
  </a>	
  <!-- Dependency Status -->
  <a href="https://depfu.com/github/2n3g5c9/airbnbot-js?project_id=6320">
    <img src="https://badges.depfu.com/badges/912fd5dddb23353385862ae6e5e1a888/overview.svg" alt="Test Coverage Status" />
  </a>
  <!-- FOSSA Status -->
  <a href="https://app.fossa.io/projects/git%2Bgithub.com%2F2n3g5c9%2Fairbnbot-js?ref=badge_shield">
    <img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2F2n3g5c9%2Fairbnbot-js.svg?type=shield" alt="FOSSA Status" />
  </a>
</div>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The simplest way to enjoy this NodeJS application is to run it in a Docker container, so make sure you have Docker CE installed: https://docs.docker.com/install/

### Installation

Clone the repository:

```bash
git clone https://github.com/2n3g5c9/airbnbot-js
```

Write a `.env` file with the following environment variables:

```bash
CLIENT_ID=""
CLIENT_SECRET=""
AIRBNBOT_ICON_URL=""
AIRBNB_CLIENT_SESSION_ID=""
AIRBNB_KEY=""
```

Then simply build the image (less than 80MB) and run a container in the background with the provided `docker-compose` configuration file:

```bash
docker-compose up -d
```

### How to use

Simply send `/london help` to your Slack bot to get instructions on how to use the command. Keep in mind this works for bookings in London but feel free to customize!

*Following is an example on how to use Airbnbot:*
<div align="center">
  <img width="650" src="https://raw.githubusercontent.com/2n3g5c9/airbnbot-js/master/img/airbnbot_screenshot.png" alt="airbnbot-screenshot">
</div>

## Tech/frameworks used

- [Node.js](https://nodejs.org/): JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Typescript](https://www.typescriptlang.org/): Typed superset of JavaScript that compiles to plain JavaScript.
- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [Webpack](https://webpack.js.org/): Bundler for javascript and friends.
- [Distroless](https://github.com/GoogleContainerTools/distroless): Language focused docker images, minus the operating system.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
