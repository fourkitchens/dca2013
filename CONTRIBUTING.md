# Contibuting to DrupalCamp Austin website

## Required gems

You may want to configure RubyGems to not install the unneeded RDoc stuff for each gem. To do that, add a `~/.gemrc` file and insert the following lines:

```
install: --no-rdoc --no-ri
update:  --no-rdoc --no-ri
```

In Terminal, run these commands to install everything you need:

```bash
sudo gem update --system
sudo gem install jekyll --pre
sudo gem install uglifier singularitygs jacket
```

## Git

We're not doing feature branches, so when you want to get upstream changes, use the rebase flag:

```bash
git pull --rebase
```

This will "rewind" your commits since your last pull, add the upstream commits, then "fast-forward" your commits back on top of the upstream changes. It may cause conflicts, but since upstream changes were already in the repo it was going to happen anyway.

## Jekyll server

In Terminal, run the following command to get a server started:

```bash
jekyll serve -w
```

The server will exist as long as your command is running. By default you go to http://localhost:4000/ to see your Jekyll site.

The ```-w``` argument means *watch* so now whenever you (or Sass) make changes to the filesystem, Jekyll will respond by regenerating a new copy of the site. Pretty cool, huh?

We have .gitignore excluding the ```_site``` directory that Jekyll creates because Github will take care of generating that folder when we push to ```gh-pages``` branch.

## JavaScript

To build the JavaScript, use `grunt` and `grunt watch`. To install the required npm modules, start with `npm install`. You may need to install node.js if you don't have it. It's easily downloadable from the nodejs.com website.

## Content

### Naming conventions

Jekyll has a hard requirement for posts' file names. The required format is as follows: ```YYYY-MM-DD-post-slug.md``` — but... we don't want to bother with a valid date for most types of pages. So we're using fake, hardcoded dates for most content. News is the notable exception, which **should** contain the actual publish date.

```
News     YYYY-MM-DD-post-slug.md
FAQs     0002-02-02-faq-title.md
Sessions 0003-03-03-session-title.md
```

### Templating

* Crash course in Liquid templates: https://github.com/Shopify/liquid/wiki/Liquid-for-Designers
* High-level overview of structured content in Jekyll: http://developmentseed.org/blog/2011/09/09/jekyll-github-pages/
* Look in the ```_layouts``` folder to see all of our templates.
