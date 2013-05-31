# Contibuting to DrupalCamp Austin website

## Required libraries

You'll need to install node.js if you don't have it. The installer is available at http://nodejs.org. You will also need Grunt, which can be installed with:
```bash
sudo npm install -g grunt-cli
```

You may want to configure RubyGems to not install the unneeded RDoc stuff for each gem. To do that, add a `~/.gemrc` file and insert the following lines:

```
install: --no-rdoc --no-ri
update:  --no-rdoc --no-ri
```

Then, in Terminal, run these commands to install everything you need:

```bash
sudo gem update --system
sudo gem install bundler
bundle install
sudo npm install
```

** NOTE: THIS IS NOT TESTED TO WORK WITH RVM OR RBENV **


## Local Development


In Terminal, run the following command to have grunt start watching files, and start our Jekyll server:

```bash
grunt server
```

The server will exist as long as your command is running. By default you go to http://localhost:4000/ to see your Jekyll site. If will also concat all JavaScript, watch for .scss file changes and any changes within the _posts folder or in an .html file. Each one of these will trigger their respective tasks to run, the Jekyll static files to be rebuilt, and LiveReload to automaticaly reload the page.

We have .gitignore excluding the ```_site``` directory that Jekyll creates because Github will take care of generating that folder when we push to ```gh-pages``` branch.


### The build pipeline

JS is kept in the `_js/` folder. *This is ignored by Jekyll.* Grunt builds the JavaScript (minimizes and concatenates it) and places the built files in the `js/` folder, which Jekyll *will* include in the site build.

In the JS source folder, there is a folder `/vendor`, which contains the minimized or unminimized versions of vendor script (e.g. jQuery and Ember), and sometimes both. We keep both in the case that the vendor provides an optimized version of their library that we can't reproduce using Grunt's minimize. For example, ember.min.js doesn't contain any assertions or debugging to reduce it's size even further than what you can achieve with a standard minimize.

The Grunt job cleans the `js/dist` folder by removing it completely. It then recreates the folder and it's contents.

### Deployment

After finishing your work, run ```grunt build``` to build production copies of the content, CSS, and JS.

## Content

### Naming conventions

Jekyll has a hard requirement for posts' file names. The required format is as follows: ```YYYY-MM-DD-post-slug.md``` — but... we don't want to bother with a valid date for most types of pages. So we're using fake, hardcoded dates for most content. News is the notable exception, which **should** contain the actual publish date.

```
News      YYYY-MM-DD-post-slug.md
FAQs      0002-02-02-faq-title.md
Sessions  0003-03-03-session-title.md
Workshops 0004-04-04-workshop-title.md
```

## Templating

* [Crash course in Liquid templates](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)
* [High-level overview of structured content in Jekyll](http://developmentseed.org/blog/2011/09/09/jekyll-github-pages/)
* Look in the ```_layouts``` folder to see all of our templates. ```_includes``` contains some templating stuff too.

## Submitting Changes

In order to submit a change, [fork the DrupalCamp repo](https://github.com/fourkitchens/dca2013/fork) and make changes on your personal fork, then use the [Pull Request](https://help.github.com/articles/creating-a-pull-request) button on GitHub to submit the changes.

### :exclamation:IMPORTANT:exclamation:

:sparkles: &nbsp; :whale2: &nbsp; :smile: Cute icons in front of commit messages are encouraged but not required
