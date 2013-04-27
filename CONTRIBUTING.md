# Contibuting to DrupalCamp Austin website

## Required gems

In Terminal, run these commands to install everything you need:

```bash
sudo gem install jekyll --pre
sudo gem install uglifier singularitygs jacket
```

## Jekyll server

In Terminal, run the following command to get a server started:

```bash
jekyll serve -w
```

The server will exist as long as your command is running. By default you go to http://localhost:4000/ to see your Jekyll site.

The ```-w``` argument means *watch* so now whenever you (or Sass) make changes to the filesystem, Jekyll will respond by regenerating a new copy of the site. Pretty cool, huh?

We have .gitignore excluding the ```_site``` directory that Jekyll creates because Github will take care of generating that folder when we push to ```gh-pages``` branch.
