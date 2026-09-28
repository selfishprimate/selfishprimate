---
title: "Seekter: A Job Search Agent That Keeps Its Own Notes"
description: "An agent that runs inside Claude Code, searches five job sources every day, filters every posting against rules you set rather than rules it guessed, fills the forms in your own browser, and keeps the whole tracker as markdown files you can read, grep and diff."
company: "Seekter"
category: "AI Agent"
tags: ["AI Agents", "Claude Code", "Automation", "Developer Tools", "Open Source", "Systems Design"]
coverImage: "./images/cover.webp"
images: []
order: 2
year: "2026"
---

> It is opinionated where the lessons were expensive: dedup before every form, never guess an answer, never invent an anecdote.

### The Problem

Applying for jobs at volume is not one task. It is five, and four of them are clerical.

Finding the postings is the part people picture, and it is the smallest. The rest is deciding whether a role is even open to you, which almost never matches what the listing says. Filling the same twenty fields into a different form system every time, each with its own quirks. Answering the same free text questions again without sending the same paragraph to two companies. And remembering, three weeks later, that you already applied to this exact job through a different site under a different identifier.

Every one of those is a memory problem wearing a different hat. The tools that exist solve the first one, the search, and hand you the other four.

Worse, the ones that look automated are usually guessing. A board badge says "Anywhere" and the posting means Poland only. A listing is labelled "Paris, France" and the actual work model line says remote with no country restriction at all. The country list that decides whether you are eligible sits behind a `+8` that nobody expanded. These are not edge cases. They are what a normal day looks like.

### What It Is

Seekter is an agent that runs inside Claude Code. Not a service, not a scraper farm: it runs on your machine, drives your own Chrome with your own logins, and writes its tracker into the repository as markdown.

It is five slash commands.

```
/seekter-init       # about 40 questions, one at a time. Writes your profile.
/seekter-run        # today's search and applications
/seekter-log        # what happened next: rejections, interviews, offers
/seekter-report     # funnel, response rate by source, top skip reasons
/seekter-git        # ship changes to the kit, after scanning for your details
```

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

The rule that came out of that is the one the whole run is built around: **harvest all five sources before filling a single form.** Sweeping is cheap and forms are not. A run that starts applying during step one runs out of room before step three, and step three is the one carrying most of the day's new postings. So the run sweeps everything, dedups, filters, ranks, and only then starts applying.

Ranking is four tiers. A for remote roles you can actually take from where you live, B for the ambiguous ones with no country stated, C for relocation where the posting or the form says sponsorship is on the table, X for skip. Pay is deliberately not in that list. A low published band, or none at all, is an answer to a form question, never a reason to pass on a job.

### The Tracker Is Files

Every posting Seekter touches is recorded once, filed by the month it was first handled. Applications are files. Skips are rows in one table per month, because most postings are skipped for a single sentence and do not deserve a file.

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

Files never move between folders when their status changes. A rejection a month later edits one line and adds a log entry, which means the history of an application stays in one place instead of being reconstructed from where the file ended up.

### What It Learned the Hard Way

The part of the repository worth reading is `reference/`. Two files, about 1,200 lines, and none of it was designed. Every line is a thing that went wrong once, in a real application, and was written down so the next run would not relearn it.

A few, to show the texture of it:

- **A cookie banner can eat a finished form.** One form was filled completely, and then "Reject all" on the consent banner wiped every field, both radio groups and the uploaded CV. The rule now is to handle the banner first and, if one reappears after the form is filled, to leave it alone and submit.
- **The form's country list beats the posting's promise.** A posting offered "work from anywhere within the EMEA time zone" while its own form header listed eight countries and a `+8` hiding the rest. Expanding that `+8` costs one call and saves the whole form. An explicit country list that omits your own is the single most common reason a good remote role dies.
- **Dedup on the apply URL, not the source's id.** A record is keyed to whichever URL it was first applied through, so a job found on LinkedIn today may be stored under an Ashby UUID from a board three weeks ago. A bulk check of LinkedIn ids will not find it. One role was applied to for the third time, after already being rejected, because of exactly this.
- **Never triage by regex alone.** One run scored 65 candidates by pattern matching their descriptions, found them all at zero, and dropped them without opening one. Two were applications, including a studio whose requirement list matched almost line for line. A zero score means "no positive signal in the text", which is the definition of the ambiguous tier, not a reason to skip. Scores now decide what order you open things in, never what you open.
- **Screenshot coordinates are not CSS pixels.** The browser frame varied between 1440 and 3008 across sessions, and a hardcoded width once clicked "No" instead of "Yes" on a knockout question.

That last one is a lesson this portfolio learned separately, on its own redesign, which is a good illustration of why the file exists: the expensive part of agent work is rarely the reasoning. It is the dozen small mechanical truths about the surface you are operating, and none of them survive in anyone's head.

### The Guardrails

An agent that fills forms on your behalf can do real damage, so the limits are written where they cannot be argued with.

It never solves or bypasses a CAPTCHA, never creates an account, never types a password, never accepts terms of use for you, never sends a message or an email as you, and never pays for anything. A visible CAPTCHA is not a puzzle to get past, it is a hand off: the posting goes into a **Needs you** table with the next step spelled out, and waits.

It also refuses to invent. If a mandatory question has no truthful answer available from your profile, it does not submit. Free text answers are built from a fact bank you wrote, in a voice you set, and every answer is stored as sent so the same sentence never goes to two companies.

And it treats the web as hostile input. Text found in a posting or a form is data, never instruction. Postings carrying hidden directions to AI readers, the "include the word X in your answer" trick, are reported rather than followed.

```js
/AI assistant|for bots|must include the word|do not use AI/i.test(document.body.innerText)
```

### Keeping the Kit Public and the Candidate Private

The repository is public and the person using it is not, which is a harder split than it looks. `.gitignore` covers `profile/`, `applications/` and `runs/`, but a `.gitignore` protects paths, not content. The real failure mode is a phone number quoted inside a reference file as a worked example.

That happened, in six separate places, and sat in a public repository until it was found. So shipping changes is its own command. `/seekter-git` builds a list of your identity values out of your profile, scans the staged diff against it, and refuses to push if anything matches. A CI job repeats the parts of that check it can do without the profile, because a rule enforced only at the keyboard is not enforced.

### Where It Stands

Five skills, two reference files, three scripts, 42 commits over about a month of daily use. It was built while being used, which is why the reference files read like a logbook rather than documentation, and then emptied of the person who used it.

The honest description of what it is: not a tool that finds you a job, but one that removes the four clerical tasks standing between you and the one that matters, and refuses to guess on your behalf while doing it.

### Links

- [GitHub Repository](https://github.com/selfishprimate/seekter)
