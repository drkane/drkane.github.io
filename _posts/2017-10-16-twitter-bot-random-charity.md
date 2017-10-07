---
layout: post
title:  "Twitter bot – random charity"
date:   2016-10-16 23:45:35 +0100
---

I’ve been playing about with twitter bots, and [following some instructions on using the twitter API in python](https://videlais.com/2015/03/02/how-to-create-a-basic-twitterbot-in-python/), I’ve created a bot that tweets a link to a random charity every half an hour.

<a href="https://twitter.com/intent/tweet?screen_name=charityrandom&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-show-count="false">Tweet to @charityrandom</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[The code and more details on the bot can be found on github](https://github.com/drkane/random-charity-bot). From the readme:

> Twitter bot that tweets the name and website of a random charity. The data is based on the register held by the Charity Commission for England and Wales, released as open data.
>
> The bot randomly selects an active charity from the register, and tweets it. If the website of the charity is known it tweets that too, otherwise it gives a link to the official register entry for that charity.
>
> This bot isn’t affiliated with the Charity Commission, and gives no endorsement of the charities tweeted.

Credit due to the following places:

- Fetch charity data script adapted from <https://github.com/OpenDataServices/grantnav/blob/master/dataload/fetch_charity_data.py>
- Twitter API use from <https://videlais.com/2015/03/02/how-to-create-a-basic-twitterbot-in-python/>
- Charity data from <http://data.charitycommission.gov.uk/> – used under Open Government Licence v3.0

<a class="twitter-timeline" href="https://twitter.com/CharityRandom?ref_src=twsrc%5Etfw">Tweets by CharityRandom</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>