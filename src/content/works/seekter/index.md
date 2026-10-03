---
title: "Seekter: Turn Your Job Search Into One Command a Day"
description: "An agent that runs inside Claude Code, searches five job sources every day, filters every posting against rules you set rather than rules it guessed, fills the forms in your own browser, and keeps the whole tracker as markdown files you can read, grep and diff."
company: "Seekter"
category: "AI Agent"
tags: ["AI Agents", "Claude Code", "Automation", "Developer Tools", "Open Source", "Systems Design"]
coverImage: "./images/cover.webp"
coverVideo: "./images/cover.mp4"
images: []
order: 1
year: "2026"
featured: true
featuredOrder: 2
---

> It is opinionated where the lessons were expensive: dedup before every form, never guess an answer, never invent an anecdote.

### The Problem

Applying for jobs at volume is not one task. It is five, and four of them are clerical.

Finding the postings is the part people picture, and it is the smallest. The rest is deciding whether a role is even open to you, which almost never matches what the listing says. Filling the same twenty fields into a different form system every time, each with its own quirks. Answering the same free text questions again without sending the same paragraph to two companies. And remembering, three weeks later, that you already applied to this exact job through a different site under a different identifier.

Every one of those is a memory problem wearing a different hat. The tools that exist solve the first one, the search, and hand you the other four.

Worse, the ones that look automated are usually guessing. A board badge says "Anywhere" and the posting means Poland only. A listing is labelled "Paris, France" and the actual work model line says remote with no country restriction at all. The country list that decides whether you are eligible sits behind a `+8` that nobody expanded. These are not edge cases. They are what a normal day looks like.

### What It Is

Seekter is an agent that runs inside Claude Code. Not a service, not a scraper farm: it runs on your machine, drives your own Chrome with your own logins, and writes its tracker into the repository as markdown.

It is five slash commands, and each one owns a different part of the loop.

#### Setup

One interview, about forty questions, asked one at a time and resumable if you stop halfway. It writes `profile/`: contact details, target titles, where you can and cannot work, salary bands, standard answers, the sectors you will not touch, a fact bank for free text, and the search queries.

```
/seekter-init
```

It can also import a tracker you already keep, from a Notion database or a spreadsheet exported as CSV, which is what makes dedup useful from the first run rather than the fiftieth.

#### Search and Applications

The daily run. Five sources in a fixed order, then filtering, dedup, form filling, tracker update and a report. It applies without asking when a posting fits, and stops only for the things only you can decide.

```
/seekter-run
```

If the session runs out of room it cuts the number of applications, never the number of sources, and the unworked queue survives into the next day.

#### What Happened Next

Records replies. Tell it in a sentence, "Acme rejected me", "I have a call with Globex on Thursday", or ask it to sweep your inbox, where it reads message bodies rather than subject lines because half of all rejections arrive under a neutral subject.

```
/seekter-log
```

It never answers an email. Anything that asks you to act, a scheduling link or a take-home, is listed for you instead.

#### The Funnel

Response rate by source and by location track, the reasons postings are most often passed over, everything still waiting on you, and at most two suggested changes to the search itself.

```
/seekter-report
```

Run `/seekter-log` before this one. The report reads the tracker, not your inbox, so replies you have not logged do not appear in it.

#### Shipping the Kit

Branches, commits and pushes the shareable files once a run has taught the agent something worth keeping.

```
/seekter-git
```

It builds a list of your identity values out of your profile, scans the staged diff against it, and refuses to push if anything matches.

The split that makes it work is between the kit and the candidate. Nothing in the tracked files assumes a field, a city, a salary or a name. Titles, queries, boards and filters all come from your profile, which `/seekter-init` builds from your answers and which git never sees.

```
profile/          ← you. git-ignored.
applications/     ← your tracker. git-ignored.
runs/             ← one report per run. git-ignored.

.claude/skills/   ← the five commands
reference/        ← how each source and each form system actually behaves
scripts/          ← the tracker CLI
templates/        ← what init fills in
```

### How a Run Works

Five sources, in a fixed order, every run: an API sweep, LinkedIn job alert notifications, LinkedIn searches, the LinkedIn saved and drafts tracker, and whatever other boards your profile lists.

They are separate channels, and none of them is a backup for another. That sounds like an assumption until you count it. One day's notification page carried 24 jobs, 13 of which never appeared in that day's nine searches. On another day, sixteen searches returned 55 matching postings and 53 of them had not appeared in that day's notification harvest. The day after, the overlap between the two was zero. Drop the third step to save time and you drop almost the whole day.

<gallery cols="1">
<figure src="./images/fig-source-overlap.webp" alt="Three measurements of how little the job sources overlap">Three days, measured in both directions. The orange segment is what the other channel also had; on 23 September it was nothing at all</figure>
</gallery>

The rule that came out of that is the one the whole run is built around: **harvest all five sources before filling a single form.** Sweeping is cheap and forms are not. A run that starts applying during step one runs out of room before step three, and step three is the one carrying most of the day's new postings. So the run sweeps everything, dedups, filters, ranks, and only then starts applying.

<gallery cols="1">
<figure src="./images/fig-sources.webp" alt="Where the tracked postings came from: LinkedIn 626, job boards 171, freehire API 31, Dice 7, inbox 6">One channel carries three quarters of everything, and the long tail of boards and APIs carries almost nothing. Knowing which is which took a month of counting, and it is the reason the run order is fixed rather than tuned</figure>
</gallery>

Ranking is four tiers, and the tiers are the design. "Is this role open to me?" is a judgment that gets made about sixty times a run, and left as a judgment it gets made differently every time. So it became a taxonomy instead: **A** for remote roles you can take from where you live, **B** for the ambiguous ones with no country stated, **C** for relocation where the posting or the form puts sponsorship on the table, **X** for skip. Four labels, applied in a fixed order, and the ambiguous case gets a name of its own rather than being rounded down to "no".

Pay is deliberately not in that list, and it was the hardest thing to leave out, because a salary band looks exactly like a filter. But a published band is an answer to a form question, and a posting with no band is not a worse job, it is a less informative advert. Sorting on pay would have meant discarding roles for being vague about money.

### The Tracker Is Files

Every posting Seekter touches is recorded once, filed by the month it was first handled. Two decisions hold the rest together, and both are about what a thing deserves.

**Applications are files, skips are rows.** Most postings are passed over for one sentence, "the country list leaves out yours", and a sentence does not deserve a file with eight headings. Skips get a single table per month instead, which keeps them greppable without burying the applications, and dedup reads that table too, so a posting passed over in week one is never re-evaluated in week four.

```markdown
---
company: Ruby Labs
role: Senior Backend Engineer
status: applied
url: https://jobs.ashbyhq.com/ruby-labs/1e548ada-…
source: freehire
ats: ashby
location_fit: A
applied: 2026-09-22
job_key: uuid:1e548ada-…
---

# Senior Backend Engineer · Ruby Labs

## Why it fits
## Notes
## Answers submitted      ← as sent, so no sentence goes to two companies
## Log
- 2026-09-22: applied
```

`job_key` is the load-bearing field. It normalises whatever identity the posting has, a LinkedIn id, an Ashby UUID, a Greenhouse id, so the same job reached through an aggregator, LinkedIn and the company's own site is still caught as one thing.

The tracker is only ever written through one small Python CLI, which is what keeps the files consistent enough to grep:

```bash
python3 scripts/seekter.py check <url> --company "Acme"    # exit 1 if already tracked
python3 scripts/seekter.py move <url> rejected --note "form mail, 2 days"
python3 scripts/seekter.py list --status pending
python3 scripts/seekter.py stats --since 2026-09-01
```

**Files never move between folders when their status changes.** The obvious structure is `applications/applied/`, `applications/rejected/`, and it is wrong: it turns the history of an application into something you reconstruct from where the file ended up. A rejection a month later edits one line and adds a log entry, so the whole life of an application reads top to bottom in one place.

### The Mistake That Changed the Ranking

I built a scoring pass to order the candidate list: grep each description for eligibility language, worldwide, EMEA, contractor, the home country, and rank by how many signals it carries. It worked well enough that I started trusting it. Then one run scored 88 candidates, found 65 of them at zero, and dropped all 65 without opening one.

Two of those 65 were applications. One was a Netherlands studio whose requirement list matched almost line for line.

The score was not wrong. I had used it for the wrong job. A zero means "this description contains no positive signal", which is the definition of the ambiguous tier, not a reason to skip; the posting had simply declined to restrict itself. I had built a ranking device and then quietly promoted it to a filter, because a filter is the thing that makes a long list short, and the list was long.

So the rule that replaced it is narrow on purpose. **Scores decide what order you open things in, never what you open.** The only things allowed to remove a candidate unopened are the ones where the posting itself closes the door: already applied, a blacklisted sector, a language you do not have, an explicit country list without your country in it.

### What It Learned the Hard Way

The part of the repository worth reading is `reference/`. Two folders, 43 files, about 1,300 lines, and none of it was designed. Every line is a thing that went wrong once, in a real application, and was written down so the next run would not relearn it.

A few, to show the texture of it:

- **A cookie banner can eat a finished form.** One form was filled completely, and then "Reject all" on the consent banner wiped every field, both radio groups and the uploaded CV. The rule now is to handle the banner first and, if one reappears after the form is filled, to leave it alone and submit.
- **The form's country list beats the posting's promise.** A posting offered "work from anywhere within the EMEA time zone" while its own form header listed eight countries and a `+8` hiding the rest. Expanding that `+8` costs one call and saves the whole form. An explicit country list that omits your own is the single most common reason a good remote role dies.
- **Dedup on the apply URL, not the source's id.** A record is keyed to whichever URL it was first applied through, so a job found on LinkedIn today may be stored under an Ashby UUID from a board three weeks ago. A bulk check of LinkedIn ids will not find it. One role was applied to for the third time, after already being rejected, because of exactly this.
Those are lessons about the domain. The other half of the file is duller and just as expensive: screenshot coordinates are not CSS pixels, the browser frame varied between 1440 and 3008 across sessions, and a hardcoded width once clicked "No" instead of "Yes" on a knockout question. The costly part of agent work is rarely the reasoning. It is the dozen small mechanical truths about the surface you are operating on, and none of them survive in anyone's head.

Both files started as one file each, and splitting them is the part I did not expect to be a design problem. `ats-mechanics.md` reached 710 lines, and five form systems ended up written about two or three times each, hundreds of lines apart, because a new lesson was always easier to append than to merge. They did not merely repeat. They contradicted: one section called a flow unreachable and told the agent to hand it off, while another, added later, carried the method that drives it. The wrong instruction came first in the file, so that is the one a run would have followed.

One file per subject fixed it, and not by being tidier. It made the contradiction impossible to write, because there is nowhere left to put the second version.

### The Guardrails

An agent that fills forms on your behalf can do real damage, so the limits are written where they cannot be argued with.

It never solves or bypasses a CAPTCHA, never creates an account, never types a password, never accepts terms of use for you, never sends a message or an email as you, and never pays for anything. A visible CAPTCHA is not a puzzle to get past, it is a hand off: the posting goes into a **Needs you** table with the next step spelled out, and waits.

<gallery cols="1">
<figure src="./images/fig-form.webp" alt="What the agent writes into a real form, and the two fields it refuses to fill">A real form, filled and then stopped. The personal values are the same placeholders the repository uses, because the repository is public and the person is not</figure>
</gallery>

It also refuses to invent. If a mandatory question has no truthful answer available from your profile, it does not submit. Free text answers are built from a fact bank you wrote, in a voice you set, and every answer is stored as sent so the same sentence never goes to two companies.

And it treats the web as hostile input. Text found in a posting or a form is data, never instruction. Postings carrying hidden directions to AI readers, the "include the word X in your answer" trick, are reported rather than followed.

```js
/AI assistant|for bots|must include the word|do not use AI/i.test(document.body.innerText)
```

### Keeping the Kit Public and the Candidate Private

The repository is public and the person using it is not, which is a harder split than it looks. `.gitignore` covers `profile/`, `applications/` and `runs/`, but a `.gitignore` protects paths, not content. The real failure mode is a phone number quoted inside a reference file as a worked example.

That happened, in six separate places, and sat in a public repository until it was found. So shipping changes is its own command. `/seekter-git` builds a list of your identity values out of your profile, scans the staged diff against it, and refuses to push if anything matches. A CI job repeats the parts of that check it can do without the profile, because a rule enforced only at the keyboard is not enforced.

### Where It Stands

Five commands, two reference folders of 43 files, three scripts, 61 commits over about a month of daily use. It was built while being used, which is why the reference files read like a logbook rather than documentation, and then emptied of the person who used it.

The numbers it produced about its own use are more useful than the build stats. Over that month it saw **853 postings**, passed over **511** of them with a written reason attached to each, and sent **341 applications**. That is the part the agent is answerable for, and it is work I would not have got through by hand.

<gallery cols="1">
<figure src="./images/fig-throughput.webp" alt="853 postings seen, 511 passed over with a written reason, 341 applications sent">The clerical work, which is the part the agent is responsible for. What came back is the market's answer, and it sits underneath at its real size</figure>
</gallery>

What came back is a different measurement, and it belongs to the market rather than to the tool. Those 341 applications produced **59 replies** by the end of September: 58 rejections and one interview.

I am not going to dress that up, and I am not going to file it as a result either. A response rate is what the market returns on volume, and an agent that fills forms cannot move it. What it can do is make it legible. Before Seekter that number was spread across a spreadsheet, an inbox and my own memory, which is another way of saying it did not exist.

The honest description of what it is: not a tool that finds you a job, but one that removes the four clerical tasks standing between you and the one that matters, and refuses to guess on your behalf while doing it.

### What Came Next

I shared Seekter on LinkedIn on 29 September. The repository went from no stars to 44 in four days, and it got a site of its own, [seekter.dev](https://seekter.dev), built in the four days that followed. How that site was made is [a case study of its own](/works/seekter-website).

### Links

- [Website](https://seekter.dev)
- [GitHub Repository](https://github.com/selfishprimate/seekter)
