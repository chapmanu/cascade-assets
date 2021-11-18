# Degrees and Programs

## Overview

2021 update: https://chapman.atlassian.net/wiki/spaces/SMC/pages/1354006529/Degrees+and+Programs

This subproject contains the BarkleyREI project version of Degrees and Programs, including a grunt build system to produce web-ready files. We use an in-house open-source app generator, found here: https://github.com/BarkleyREI/generator-brei-app.

The file structure includes two top level folders, `build` and `source`. The `source` folder contains all precompiled and uncompressed source files, and the `build` folder is where the web-ready files deploy to (see instructions in the Deployment section below).

Within the `source` folder, there are two subdirectories, `cascade` and `static`. The `cascade` folder contains copies of the most recent Chapman Cascade Server assets, such as templates and formats. The `static` folder contains the original source code, including static HTML of the site that can be run locally.

## Installation - Mac OS X

The Degrees and Programs project is developed using a Node app generator. To install and setup the app generator on Mac, run the following commands:

    cd subprojects/degrees-and-programs/source/static/
    sudo gem install -n /usr/local/bin scss_lint
    sudo gem install -n /usr/local/bin compass
    npm install -g bower
    npm install -g compass

    npm install
    bower install

## Installation - Windows
    Ensure you've installed Yarn: https://yarnpkg.com/en/docs/install#windows-stable
    Ensure you've installed a current version of node.js: https://nodejs.org/en/
    cd subprojects\degrees-and-programs\source\static\ 
    gem install scss_lint
    gem install compass
    yarn add bower
    yarn add compass
    yarn install
    bower install

## Testing

To test your project, you will want to deploy the contents of the `build` directory to a server. This is the directory that contains the built, web-ready content.

## Deployment

The following commands can be used to run, build, and finally, deploy your project to the `build` directory.

- `grunt server` – Runs the project on a local server, shows any changes made using livereload
- `grunt` – Builds the project once all your changes have been made
- `grunt deploy` – Deploys the built version of the project from `source/static/dist` into the `build` directory, which is the web-ready version of the site


Sarah Harissis
BarkleyREI
sharissis@barkleyrei.com


## Nick Notes (gotchas discovered in 2021)
- SVGs are located in subprojects/degrees-and-programs/source/static/app/assemble/includes/_svg.hbs and referenced throughout the project via