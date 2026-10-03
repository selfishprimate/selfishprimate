---
title: "Seekter: The Website, From a LinkedIn Post to Live in Four Days"
description: "The site Seekter got once its launch post took off, built in four days by directing Claude Code: a dark theme that shifts tone with the visitor's clock, a pixel-art mascot drawn entirely in code, and a lab where both were worked out before they shipped."
company: "Seekter"
category: "Web Design"
tags: ["Web Design", "AI-Native", "Claude Code", "Pixel Art", "Motion", "Design Tokens"]
coverImage: "./images/cover.webp"
coverVideo: "./images/cover.mp4"
images: []
order: 1
year: "2026"
featured: true
featuredOrder: 3
---

> The decisions stayed mine. What disappeared was the gap between deciding and seeing.

Seekter is an agent that runs inside Claude Code and turns a day of job applications into one command. The agent has [a case study of its own](/works/seekter). This one is about the site it got afterwards, and how that site was made.

### After the Post

The repository had been public for a week without a single star when I shared Seekter on LinkedIn on 29 September. The post went further than anything I had written before: close to 300 likes in its first three days, and a comment thread long enough that answering it became part of the work.

GitHub moved with it. Twenty-one stars arrived on [the repository](https://github.com/selfishprimate/seekter) on the day of the post, and there were 44 four days later.

A post sends people to a repository, and a repository opens on a README, which is a document rather than a front door. So the decision that week was to give Seekter a site of its own, and to have it up while people were still arriving.

### A Site in Four Days

[seekter.dev](https://seekter.dev) was built between 30 September and 3 October: 26 merged pull requests and close to ninety commits. Its job is narrow. Say what Seekter is in one line, show what a day of it looks like, and get someone from the page to `git clone` without reading anything else.

The hero is the one line and the clone command, with the repository's stars and forks under it and the faces of the people who starred it. GitHub has stopped showing who starred a repository to anyone but its owner, so that roster cannot be fetched by the page. A scheduled GitHub Action refreshes it every six hours instead and commits it, and the counts beside it are read live.

Below that, the five commands sit beside a terminal that replays them. The figures in it are not invented for the page: the run is the report of 1 October, and the report segment is what the tracker printed that day.

<gallery cols="1">
<figure src="./images/site-commands.webp" alt="The five slash commands beside a terminal replaying the 1 October run">The run as the terminal replays it, the five sources and their counts set in columns so the figures line up down the rows</figure>
</gallery>

### Built AI-Native

Nothing on the site was drawn in a design tool first. It was designed the way I described in [Design in Figma is Dead, Long Live Design in Code](https://medium.com/design-bootcamp/design-in-figma-is-dead-long-live-design-in-code-56cd97a19173): in the terminal, in conversation with Claude Code, against the running page rather than a picture of it. I said what was wrong with what I was looking at, it changed the code, opened the page in a browser of its own, measured what it had done, and I looked again. The two tones, the dog, the terminal, the spacing of the footer: every one of them was decided that way. Nothing reached the live site without a pull request, because merging is deploying, and the pull request is the last place a change can be read before it is live.

What that changes is the cost of trying something. The footer spacing took four attempts, the dog's head round a side edge was redrawn twice, and none of those attempts cost more than a sentence. The decisions stayed mine. What disappeared was the gap between deciding and seeing.

Figma still had a job, just not that one. The marketing around the site was made there: the share card, the case study covers and the thank-you video for LinkedIn. Claude did much of that work through Figma's MCP server, laying out the frames, building the pixel dogs layer by layer from the same cell data the site draws them from, and setting the keyframes that animate them in Figma Motion. So the dog in a video moves exactly as it does on the page. For the share card it went looking before it drew, searching real products through Mobbin's MCP server for references, and then drafted three or four directions to choose from.

Even the animations in this case study came out of the terminal: the live site, driven by a scripted browser on a fake clock, recorded one animation frame at a time.

### Two Tones, One Clock

The site is dark at every hour, but not the same dark. Between 07:00 and 19:00 on the visitor's own clock its ground sits a step lighter, `#171412` instead of `#0c0a09`, and the borders, fills and secondary text move with it. Type and the oranges do not move.

An inline script sets the tone before the first paint, so it never flashes, and checks again every minute, so a page left open into the evening turns with it. Both tones clear AA with room to spare: body text is 16.7 to 1 on the day ground and 18 to 1 at night, and the orange type is 5.9 and 6.4.

<gallery cols="1">
<figure src="./images/site-tones.webp" alt="The Seekter hero split down the middle, the night tone on the left and the day tone on the right">The same hero at 22:00 and at 10:00, split down the middle. Night on the left, day on the right</figure>
</gallery>

### A Dog Drawn in Code

Seekter's mascot is a Chihuahua, and there is no image of it anywhere in the repository. It is built from parts in TypeScript: a body, four legs, a tail, a collar and a head with a three-quarter face, on a grid of 12 by 11 cells in six tones of the site's orange. Every frame is composed from those parts, so a new scene is a new arrangement rather than a new drawing. The three standing poses came from a sprite sheet, and the lab checks the parts against it cell for cell.

It has ten scenes, and the site gives it four places to play them.

- **Beside the wordmark:** it opens with a wag of the tail, then plays a scene picked at random on every visit, from the ones that still read at logo size.
- **On the 404:** it pees on a hydrant, leaves a pile, or sniffs its way straight into a wall, at random. A page that is not there gets the dog's opinion of it.
- **Along the footer:** it patrols the bottom rule nose down, lifts a leg at each corner, and every so often stops in the middle for the other thing.
- **Behind the command block:** it never comes out. It grips an edge, puts its head round, looks at you, looks about, and goes back. Round a side the head is cocked out from the block, over the top it rises ears first, and the edge is picked at random each time, never the one it has just left.

<gallery cols="1">
<figure src="./images/dog-scenes.gif" alt="Ten scenes of the Seekter dog playing side by side in the mascot lab">Every scene on the spot: the sniffing walk, the tail chase, barking, digging, rolling over, scratching, the hydrant, the pile, the wall and the heart</figure>
</gallery>

All of it respects reduced motion. Asked for less, every dog on the site stands still, and the one behind the command block does not appear at all.

### The Lab

None of this was drawn on the home page. It was worked out on [seekter.dev/lab](https://seekter.dev/lab), a catalogue of pieces of the site built on pages of their own before they ship.

<gallery cols="1">
<figure src="./images/site-lab.webp" alt="The Seekter lab catalogue with two entries, Mascot and Color Mode">The lab catalogue. Each entry previews itself live</figure>
</gallery>

- **Mascot:** every dog on the page plays or pauses together, steps a frame at a time and runs at any speed. One section walks it across a stage, another plays every scene on the spot, side by side, and the last two lay its poses against the sprite sheet they were taken from and show a whole loop frame by frame. There are three breeds, a Chihuahua, a Golden Retriever and a Dachshund, and the two that did not make it to the site are still there, which is what made redrawing the Chihuahua cheap.
- **Color Mode:** the visitor's clock and a strip of the twenty-four hours. Pick an hour and the whole page takes that hour's tone. Below it, the same pieces of the site in both tones side by side, and every token with its contrast ratio in each.

<gallery cols="1">
<figure src="./images/site-lab-mascot.webp" alt="The mascot lab page with its settings, the stage and the grid of scenes">The mascot lab, where the scenes were drawn and checked</figure>
<figure src="./images/site-lab-color-mode.webp" alt="The color mode lab page with the hour strip and the two tones side by side">The color mode lab, where the day tone was tuned against the night one</figure>
</gallery>

The lab pages are kept out of search on purpose. They are workbenches, and somebody arriving from a search result for a job-search agent should land on the page that explains it.

### What It Adds Up To

Four days, from a post that went further than I expected to a site that stands on its own. It is not a large site. It says what Seekter is in one line, shows a real day of it, and gets someone to `git clone`, and everything else on it is there to make that walk worth taking: a ground that keeps the visitor's hour, and a dog that is never quite doing what you expect.

What I would keep from it is the way it was made rather than any one piece of it. Every decision was taken against the running page, with the cost of changing my mind close to nothing, and that changed which ideas were worth trying at all. A dog peeking round a code block is not something I would have specified in a design file and handed over. It is something you try because trying it costs a sentence, and keep because you can see it working.

Figma did not leave the process. It moved to where it is strongest, the frames that leave the site: the share card, the covers, the video. The site itself was designed where it lives.

### Links

- [Website](https://seekter.dev)
- [Lab](https://seekter.dev/lab)
- [GitHub Repository](https://github.com/selfishprimate/seekter)
- [Seekter, the agent: case study](/works/seekter)
- [Design in Figma is Dead, Long Live Design in Code](https://medium.com/design-bootcamp/design-in-figma-is-dead-long-live-design-in-code-56cd97a19173)
