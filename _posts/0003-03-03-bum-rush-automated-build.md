---
layout: session
category: session
permalink: /sessions/bum-rush-automated-build/
published: true

title: Bum Rush to an Automated Build
summary: "Bum Rush to an Automated Build: what you need to know to get your Drupal project ready for Continuous Delivery."
presenters: Michael Godeck, David Ford
track: Development
difficulty: Intermediate

day: TBD
start: TBD
room: TBD
---

Bum Rush to an Automated Build
“…what you need know to get your Drupal project ready for a Continuous Delivery workflow”

Michael Godeck, Thoughtworks
http://www.thoughtworks.com/continuous-delivery
David Ford, Smith and Robot
www.smithandrobot.com/about

The big picture: We’ll work though how to go about deconstructing an ad-hoc Drupal site to get it ready for a continuous delivery (CD) workflow. This is not a discussion about how to stand up a CI tool like Jenkins, but how do the ground work to get into the CD game.

Target Audience: non-technical project managers and product owners as well as developers will benefit from the orientation to Continuous Delivery in the Drupal context, comprising the first half of the session. The second half of the session is given over to the joys of drush tasks with phing.

Questions we’ll answer:

* What is Continuous Integration, what is Continuous Delivery and what’s the difference?
* Why is CD is not a “Dev-ops” task, but everybody’s job?
* What are you actually using your deployment environments for?
* If you were a delivery pipline, how would you think about Drupal?
* Drupal admin: friend or foe?.
* Got phing?

Discussion:

A really big part of building software is figuring out what to build. All of the coder magic you can muster isn’t worth salt if you build the wrong thing, so we put a lot of emphasis on an open, iterative process early on, hoping to find our mistakes while we’re still fresh so that we can focus on right stuff. Drupal is great at getting something up and running fast.

One of the sneaky aspects of this approach is when some ad-hoc proof-of-concept project starts getting casually referred to as “done”. Hair standing up on the back of your neck, you’re not sure what you’re supposed to say. Done? It’s embarrassing. You know the difference between something that works, and something that can be delivered and maintained. Getting Drupal to play nice at this point can be a little tricky.

Getting to an automated build really smokes out the ambiguities. Is it in the build? But when do you start the build? Half the time the site is half built before anybody is sure that it’s the site they want to build, and maybe you don’t want to spend a lot of time building a delivery pipeline when not even sure it’s going to deliver. Sure, ideally, automate everything always, but sooner or later, you’re going to get Bum Rushed into an Automated Build.

We look at getting a work-in-progress prototype Drupal site ready for an automated build process; to get it to a state where you can dry out ambiguity, mitigate risk and focus on delivery.
