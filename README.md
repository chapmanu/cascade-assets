# Cascade Assets

This repository consists of sample HTML that Cascade Server generates for www.chapman.edu. It contains the build system for stylesheets, javascripts, and images that we use on www.chapman.edu. Use this repository to develop for www.chapman.edu locally, then deploy your HTML changes and asset files to the Cascade Server when they are ready.

## Setup

```
git clone git@github.com:chapmanu/cascade-assets.git
cd cascade-assets
bundle install
rake serve
```

## Possible Errors
*** If you’re not getting any error please skip to the next step to install npm packages ***

### Ruby version

You may find the detailed step-by-step instructions here: https://mac.install.guide/ruby/1.html

If you’re getting the following error when executing “bundle install”:
```
ERROR: While executing gem ... (Gem::FilePermissionError)
You don't have write permissions for the /Library/Ruby/Gems/2.6.0 directory
```

#### Check installed version of the Ruby:

```
ruby --version
```
If you see /usr/bin/ruby, it is the system Ruby which comes pre-installed on macOS to support scripting. Don't try to remove the system Ruby. Leave it in place and use Homebrew or a version manager to install a newer Ruby version.

#### To Install Homebrew:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### To install version manager: (ex: rbenv)
Supplemental instructions: https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-macos

```
brew install rbenv
```

To use rbenv, add the following line to your ~/.zshrc:
```
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

Close and reopen the terminal after installation.
Confirm installation of the rbenv:
```
rbenv --version
```
#### Install Ruby with rbenv:

```
rbenv plugin add ruby
rbenv install ruby 2.7.3
```

Set the default version of Ruby:
```
rbenv global ruby 2.7.3
```

To set the local default version, go to the project folder and run:
```
rbenv local ruby 2.7.3
```

Once you’ve set the default version of the Ruby run “bundle install” again!
```
bundle install
```

#### Issues with M1 Macs: 
This may be an issue with Macbook that are running the M1 chip, but if you are getting this error when running "bundle install":
```
There was an arror parsing 'Gemfile': cannot load such file -- em/pure_ruby. Bundler cannot continue
```
Try running the following commands:
```
gem uninstall eventmachine
gem install eventmachine --platform ruby
```

#### Install NPM packages:

To install npm packages, run the following commands in the same order:
```
npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" 35502DF3-AEA2-4B2E-9B3E-3C5D1BADEC18
npm install
```
If you are getting errors when running 'npm install', make sure that you are running the version of the node the project supports. You can check the version of node by running:
```
node -v
```
For NIX (Linux, OS X, ...) - Use n, an extremely simple Node version manager that can be installed via npm.
```
npm install -g n   # Install n globally
n <version>        # Install and use a version of node
```

#### Install Python (Big Sur and up):
On MacOS Big Sur and higher, if you run into:   *NPM Error "Can't find Python executable"*  
Run the following:
```
brew install pyenv
```
Any modern version of python should do.
```
pyenv install 3.10.6
pyenv global 3.10.6
```
Add pyenv to your PATH so that you can reference python.
```
echo "export PATH=\"\${HOME}/.pyenv/shims:\${PATH}\"" >> ~/.zshrc
```
Open a new terminal session for changes to take effect.
#### Run server:

```
Rake serve
```

Send your browser to [http://localhost:5000](http://localhost:5000). Turn on your livereload extension (optional).

## Making Changes

- **HTML:** Sample HTML for the website lives in `app/views`
- **CSS:** Edit the stylesheets in `app/assets/stylesheets/`
- **JS:** Edit the javascripts in `app/assets/javascripts/`
- **IMAGES:** Add/remove images in `app/assets/images/`

Sometimes after making changes to the assets, you won't see them in the browser. Try running the following in a separate command line window:

    bundle exec rake assets:precompile

## Tests

The testing suite includes feature tests exercising javascript functionality. These tests require the phantomjs driver. The easiest way to install this is with homebrew:

    brew install phantomjs

To run all tests:

    bundle exec rake test

To run a single test:

    bundle exec rake test/features/dashboard_test.rb

## Deploying to Cascade

To deploy changes in this repository to Cascade, please see the [Cascade Assets Deployment page](https://wimops.chapman.edu/wiki/Cascade_Assets_Deployment) on the WimOps Wiki. This page contains the most up-to-date instructions. There are a few older Knowledge Base articles that were once used for these deployments but we are in the process of removing them, so refer to the Wiki instead.

## OmniNav

There are currently 2 versions of the OmniNav out in production right now: v1 and v2. The only site that has v2 at the moment is Chapman.edu. All other sites that have the OmniNav (Blogs, Inside, our .NET apps, etc.) are using the old version, v1. This repository includes an OmniNav builder that builds the old v1 versions of the OmniNav navbar for the other projects, not Chapman.edu.

When making updates to the old v1 OmniNav, run the following rake command to build the assets and markup:

    rake build:omninav

It will output the generated OmniNav v1 assets and markup files under the `build` directory. To update the OmniNav v1 markup, you'll want to update the appropriate method in the OmniNav Builder class found in the `lib` directory.

For more information on the OmniNav, see [the OmniNav page](https://kb-smc.chapman.edu/?p=2425) in the Knowledge Base.

## CSS Conventions

### Widget Names and Classes

HTML for widgets should all have a class on the outer most element composed of its name followed by the `-widget` suffix. For example:

```html
<div class="messaging-widget"> ... </div>
<div class="chapman-social-feed-widget"> ... </div>
<div class="call-to-action-3-up-widget"> ... </div>
<div class="call-to-action-block-widget"> ... </div>
```

### Widget Variations

When it is necessary to have variations of the same widget, add more classes to the root element of the widget. The classes should consist of the full widget class name noted above, followed by two underscores and the name of the variation.

```html
<div class="messaging-widget messaging-widget__2-column"> ... </div>
<div class="messaging-widget messaging-widget__1-column"> ... </div>
<div class="messaging-widget
            messaging-widget__1-column
            messaging-widget__text-light"> ... </div>
```

Following these conventions helps us keep our css in check.

## Data Definition XML Conventions

### Links

Follow these conventions to keep our xml consistent across link types in our data definitions within Cascade.

#### Media/Image Link

```xml
<group identifier="media" label="Media">
  <asset type="file" identifier="fileLink" label="File Link"/>
  <text identifier="alternateText" label="Alternate Text"/> <!-- Do NOT include alt text if image is a background image -->
</group>
```

#### Page Link

```xml
<group identifier="link" label="Link">
  <text type="radiobutton" identifier="linkType" label="Link Type" default="Internal Link">
    <radio-item value="Internal Link" show-fields="path/to/my/widget/link/internalLink"/>
    <radio-item value="External Link" show-fields="path/to/my/widget/link/externalLink"/>
    <radio-item value="File Link" show-fields="path/to/my/widget/link/fileLink"/>
  </text>
  <text identifier="externalLink" label="External Link" help-text="full url (including http) to page outside of Cascade"/>
  <asset type="page" identifier="internalLink" label="Internal Link"/>
  <asset type="file" identifier="fileLink" label="File Link"/>
  <text identifier="label" label="Label"/>
</group>
```

## Velocity Templating Language (VTL)

For full reference, see the Apache Velocity Project site:

- http://velocity.apache.org/engine/1.7/vtl-reference.html

For Chapman's Velocity style guide, see the wiki:

- https://wimops.chapman.edu/wiki/Velocity

## Developer Tips

### Cascade Testing

To test changes inside the Cascade CMS, like adding or updating a Velocity format, the simplest way to test changes is to create a test page in the `test-section` of the folder tree. Recommended practice:

- Create a new folder in `test-section`: "Add Content" > "Default" > "Folder"
- Copy an existing page: in folder tree, right click on a page and select "Copy" from the dropdown.
- Save new page copy to your test folder.

### Static Directory Assets

At times, in order to build a sample page, you'll want to include assets like images or stylesheets that you do not want to be bundled and deployed with the assets under the `app` directory. You can do this by taking advantage of the `static/_files` directory.

Here's an examples used with the Law School Content Type sample (under Two Column Sample Pages on the home page):

This sample page uses the [slideshow template](https://github.com/chapmanu/cascade-assets/blob/development/app/views/_cascade/templates/school_home_pages/slideshow.html) from Cascade. That includes a [stylesheet link](https://github.com/chapmanu/cascade-assets/blob/development/app/views/_cascade/templates/school_home_pages/slideshow.html#L16), `/_files/css/level_2013.css`. This stylesheet is not part of the Cascade Assets bundle. Still, we want to be able to link to this in our sample page, so that it renders the styling more faithfully.

So we put the stylesheet at [/static/\_files/css/level_2013.css](https://github.com/chapmanu/cascade-assets/blob/development/static/_files/css/level_2013.css).

At runtime, the [application controller will move this directory](https://github.com/chapmanu/cascade-assets/blob/development/app/controllers/content_types/school_home_pages_controller.rb#L12) under the `public` directory that is accessible under dev server's document root. And, thus, we can use the [same layout template](https://github.com/chapmanu/cascade-assets/blob/development/app/views/_cascade/templates/school_home_pages/slideshow.html) that Cascade uses without any changes.

This can also be used for other assets that you don't want bundled and deployed to Cascade, like those to style the Cascade Assets dashboard.

## Version References

Version incompatibilities may occur during setup. For reference, please try again with the following versions:
- ruby 2.7.3
- rbenv 1.2.0
- bundler 1.17.3
- node 13.11.0
- npm 6.13.7
- python 3.10.6