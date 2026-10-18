---
title: "Seekter: The Website, From a LinkedIn Post to Live in Four Days"
description: "A site for Seekter, built in four days while its launch post was still travelling and refined for two weeks after, designed entirely by directing Claude Code against the running page. Three decisions shaped it: content laid on one sheet, a light mode that lights only that sheet, and an ink with no cold greys left in it."
company: "Seekter"
category: "Web Design"
tags: ["Web Design", "AI-Native", "Claude Code", "Pixel Art", "Motion", "Design Tokens"]
coverImage: "./images/cover.webp"
coverVideo: "./images/cover.mp4"
website: "https://seekter.dev"
images: []
order: 1
year: "2026"
featured: true
featuredOrder: 3
---

> The decisions stayed mine. What disappeared was the gap between deciding and seeing.

Seekter is an agent that runs inside Claude Code and turns a day of job applications into one command. The agent has [a case study of its own](/works/seekter). This one is about the site it got afterwards: why it was needed, how it was made, the three decisions that shaped it, and what it did.

### Context

The repository had been public for a week without a single star when I shared Seekter on LinkedIn on 29 September. The post went further than anything I had written before: close to 300 likes in its first three days, and a comment thread long enough that answering it became part of the work. Twenty-one stars arrived on [the repository](https://github.com/selfishprimate/seekter) that day, and there were 48 by 3 October.

### The Problem

All of that attention landed on a README. A README is a document, not a front door: it explains a project to someone who has already decided to read about it. The people arriving from the post had not decided anything yet. They needed to learn what Seekter does in one line, see what a day of it looks like, and get to `git clone` without reading anything else.

That became the brief for [seekter.dev](https://seekter.dev), with one constraint on top of it: it had to be up while people were still arriving. It went live between 30 September and 3 October, in 26 merged pull requests.

The page that does the job is short. The hero is the one line and the clone command, with the repository's stars and forks under it and the faces of the people who starred it. The clone command is one block that copies on a click anywhere in it. Below it, the five commands sit beside a terminal window that replays them, and the figures in that terminal are real: the run is the report of 1 October.

<gallery cols="1">
<figure src="./images/site-loop.webp" alt="The five Seekter slash commands listed beside a terminal window replaying a real run">The five commands beside the terminal that replays them, its counts from the report of 1 October</figure>
</gallery>

### How It Was Made

Nothing on the site was drawn in a design tool first. It was designed the way I described in [Design in Figma is Dead, Long Live Design in Code](https://medium.com/design-bootcamp/design-in-figma-is-dead-long-live-design-in-code-56cd97a19173): in the terminal, in conversation with Claude Code, against the running page rather than a picture of it. I said what was wrong with what I was looking at, it changed the code, opened the page in a browser of its own, measured what it had done, and I looked again. Nothing reached the live site without a pull request, because merging is deploying.

What that changes is the cost of trying something. The footer spacing took four attempts. The banner between the commands and the questions went through half a dozen colours, sage and pink among them, before it settled on the page's own dark. Every one of those attempts cost a sentence, so trying the unlikely option became the normal thing to do rather than the expensive one.

Figma kept a job, just a different one. The share card, the case study covers and the thank-you video for LinkedIn were made there, with Claude working through Figma's MCP server and building the pixel pets from the same cell data the site draws them from. Once the site had settled, the direction reversed: Claude rebuilt its pages in Figma from the running code, every spacing measured off the live page, with variables for each of the site's tones. The full pages in this case study are exported from that rebuild.

### Decision One: One Sheet Instead of Rails

The site launched framed. The content ran between striped rails down both sides, with a rule across every section. It read as engineered, but it also turned the page into a stack of boxes, and every new section meant another line.

Two weeks in, the rails and the rules came off. Everything between the hero and the footer now lies on one sheet, set 24px in from the window's edges, with rounded corners and a grain of its own. The surfaces step up through two tokens, the sheet and the card on it, so a terminal or a banner stands off the sheet the way the sheet stands off the page. The spacing has one rhythm: 128px between sections and at the sheet's edges, and 64px from a section's heading to what it opens. On a phone the sheet runs full bleed, because a 24px margin and a 40px corner cost too much of a narrow screen.

<gallery cols="1">
<figure src="./images/site-before.webp" alt="The Seekter site at launch, with striped rails down both sides and a rule between the hero and the commands">At launch: the content framed between striped rails, every section closed by a rule</figure>
<figure src="./images/site-after.webp" alt="The Seekter site two weeks later, the hero on the page and the content on one rounded sheet">Two weeks later: the hero on the page, everything after it on one sheet</figure>
</gallery>

The sheet also separated two things the rails had mixed together: the frame of the site, meaning the header, the hero and the footer, and the content inside it. That separation is what made the second decision possible.

<gallery cols="1">
<figure src="./images/site-page-home.webp" alt="The whole Seekter home page in dark mode, from the hero to the footer">The whole home page: the hero, then the sheet with the commands, the manifesto's line, the three feedback cards and the questions, then the footer</figure>
</gallery>

### Decision Two: A Light Mode That Lights Only the Content

Dark is the site's own mode, and it keeps the visitor's hour: between 07:00 and 19:00 on their clock the ground sits a step lighter, set before the first paint so it never flashes.

The first light mode turned the whole page to paper. It worked, and it lost the site. The dark hero with its orange glow, the pets against the dark, the feel of a terminal: all of it went with the background. But the reason anyone asks for a light mode is reading, and reading happens on the sheet.

So light mode now lights the content only. The header, the hero and the footer stay dark, and the sheet between them turns to paper. The page keeps its frame and only the reading surface changes. One element had to be told to stay dark as well: the feedback band, which in light mode became a bright white block in the middle of the paper. Kept dark, it reads as part of the frame passing through the content.

<gallery cols="1">
<figure src="./images/site-tones.webp" alt="A day drawn as a bar from 00:00 to 24:00, lit from 07:00 to 19:00, over the same view of the Seekter site in four strips: dark at night, dark by day, light by day and light at night">Four tones on one clock: the same view at 22:00 and 10:00 in each mode. The hero only shifts its tone, and light mode turns the sheet to paper</figure>
</gallery>

### Decision Three: No Cold Greys on Warm Paper

Once the sheet was paper, something about it read wrong, and it took a measurement to say what. I built a page in the lab that reads every colour token live from the stylesheet and gives its contrast and its hue, then audited every text and icon colour on the site in both modes and both tones.

The paper was warm, and the light mode's ink was not. Its text and rules came from a borrowed neutral slate, and the borders read as grey lines on cream. The audit found more: pure white on the orange buttons, and a cool zinc grey left over in the hero's line. In all, 51 of 188 colour uses measured as neutral or cool. The secondary text also fell just short of AA on the sheet's muted fills.

The fix was a rule rather than a list of patches: nothing on the light sheet is a neutral grey or a pure white. The ink was warmed to the paper's own hue, the rules became a warm brown let through, the cards went from white to a warm off-white, and every border on the site was moved onto one token. The same audit afterwards found all 178 colours warm, and the secondary text passing AA.

<gallery cols="1">
<figure src="./images/site-colour.webp" alt="The Seekter palette: page, sheet, card and paper surfaces, ink and muted text, the two oranges, and the ramp of coat colours they came from">The palette after the audit: warm surfaces, warm ink, and an orange taken from the pets' coats</figure>
</gallery>

<gallery cols="1">
<figure src="./images/site-lab-tokens.webp" alt="The tokens lab showing the colour tokens of the page and the light sheet with values, contrast and hue">The tokens lab: every token as each surface has it, with its contrast and its hue, flagged when it reads cold</figure>
</gallery>

### The Brand

The site had to look like the kit it sells: something that lives in a terminal and does its work quietly. The mark is Alf, drawn in the same cells as every scene he plays, and the name is set in Stack Sans Notch, kept for the wordmark alone so its notches stay a signature. Everything else is set in three faces with one job each: Sora for what is said, IBM Plex Sans for what is explained, and JetBrains Mono for what is typed.

<gallery cols="1">
<figure src="./images/site-wordmark.webp" alt="Alf lying by a laptop on a pixel grid beside the Seekter wordmark">The mark and the wordmark: Alf by a laptop that works on its own, and the name in Stack Sans Notch</figure>
<figure src="./images/site-type.webp" alt="Sora, IBM Plex Sans and JetBrains Mono, each with a sample of the job it does on the site">Three voices, each with one job</figure>
</gallery>

### Two Pets Drawn in Code

Seekter has two mascots, Alf the Chihuahua and Tarçın the cat, and there is no image of either in the repository. Both are built from parts in TypeScript on a grid of 11 rows, so a new scene is a new arrangement of the same parts rather than a new drawing. Every scene exists for both, played the way that animal would play it: where the dog barks, the cat meows by her empty bowl; where he sniffs his way along, she stalks. There are twenty-three. The visitor picks a pet and the whole site wears it, and the footer carries a dedication to the memory of Tarçın, the most loved and most loving cat of all time.

<gallery cols="1">
<figure src="./images/site-pets.webp" alt="Alf the Chihuahua and Tarçın the cat in pixel art, three walking poses each">Alf and Tarçın, three poses each from the same walk</figure>
</gallery>

They are where a visitor does not expect them: beside the wordmark, peeking over the edge of the clone command and ducking back, chasing a moth above the commands, patrolling the footer, and on the 404, giving their opinion of a page that is not there. Over the manifesto's line on the home page, “Automate the labour, never the truth,” the pet is off duty, because the line says the work is the kit's: swaying in a hammock, sunbathing under a parasol, or dozing by a laptop that fills with lines on its own, picked at random on each visit. Where it dozes off, it sleeps the way it does in its nap. Asked for less motion, they all stand still.

<gallery cols="1">
<figure src="./images/site-hammock.webp" alt="Alf swaying in a hammock over the line Automate the labour, never the truth">Off duty over the manifesto's line</figure>
</gallery>

None of this was worked out on the home page. Every piece was built first in [the lab](https://seekter.dev/lab), on a page of its own: the pets and their scenes, the modes and tones, the icons as pixel art, the feedback cards beside the versions they replaced, and the tokens.

<gallery cols="1">
<figure src="./images/site-page-lab-mascot.webp" alt="The Seekter mascot lab page in dark mode, every pet on it playing">The mascot lab, playing: the controls, a stage Alf walks across, and his twenty-three scenes on their tiles, from the sniffing walk to reading the manual</figure>
</gallery>

### Outcome

The post brought the first wave: 48 stars by 3 October. The site went live as that wave was falling, and the repository kept growing behind it, to 71 stars and 13 forks two weeks later.

The clearer signal is in the clones. Over the first two weeks of October, GitHub reported 1,732 clones of the repository from 695 unique cloners, against 343 unique visitors to its page. Not all of those cloners are people. The repository's own CI checked it out 224 times in the same fortnight, and crawlers clone public repositories too. But even counting every CI run as a separate cloner, more clients cloned the repository than opened it, and clones held steady through the second week, at more than a hundred a day, while views of the page fell by half. That is the pattern a page built to get people straight to `git clone` should leave behind, though GitHub's counts cannot show who those cloners were.

What I would change is the measurement. The site's links to GitHub drop the referrer, so GitHub cannot say how many of those visits came from seekter.dev. The next version will pass it on, so the next case study can show the path from the page to the clone rather than infer it.

### What I Would Keep

The way it was made, more than any piece of it. Every decision was taken against the running page, and that changed which ideas were worth trying at all. A dog peeking over a code block, a light mode that leaves the frame dark, an audit that finds cold colours on a warm page: none of these is something I would have specified in a design file and handed over. They are things you try because trying costs a sentence, and keep because you can see them working.

### Links

- [Website](https://seekter.dev)
- [Lab](https://seekter.dev/lab)
- [GitHub Repository](https://github.com/selfishprimate/seekter)
- [Seekter, the agent: case study](/works/seekter)
- [Design in Figma is Dead, Long Live Design in Code](https://medium.com/design-bootcamp/design-in-figma-is-dead-long-live-design-in-code-56cd97a19173)
