---
title: 'Your platform has users, and they are not happy'
description: >
  The workarounds engineers build around your platform are the most honest telemetry
  you will ever get, and most teams treat them as a compliance problem.
date: 2026-06-28
tags: ['platform engineering', 'product', 'developer experience']
draft: true
---

The platform team ships something correct. Well-architected, handles the edge cases,
more reliable than what it replaces and cheaper to run. By every measure the team owns,
it is a success.

And then, quietly, engineers route around it.

I know the shape of that because I have been the team. At Nullify I designed and built
the triage system from nothing, and I was confident about it in the way you are
confident about something you have reasoned through carefully and not yet watched anyone
use. [SPECIFIC NEEDED: what people actually did instead in the early weeks, at category
level: kept a manual list, re-ran things by hand, ignored a queue? And roughly how long
before you noticed.] The correction was not architectural. I had built the thing I would
have wanted, having already loaded every assumption that made it obvious.

Nobody escalates when this happens, because nobody thinks of it as a problem. They think
of it as getting their job done.

## The category error is real but it is not the cause

A platform is infrastructure. It is also a product, and the product half is the half
nobody staffs for. Its users happen to be engineers, which makes it easy to assume they
will cope.

I used to stop the argument there, and stopping there is why the argument never changes
anything. Platform teams under-invest in developer experience because the investment is
unfundable. Reliability has a number, cost has a number, and onboarding friction has
anecdotes. You cannot take anecdotes to a headcount conversation. If you want a platform
team to behave like a product team, give them a metric their funding survives on and
take a reliability target away in exchange. Otherwise you are asking people to spend
attention their employer punishes them for spending.

## The workarounds are the product research

The one I keep thinking about is the copied module. In cloud migration work you see it
constantly: a team takes the sanctioned Terraform module, copies it into their own repo,
edits four lines, and never mentions it. It looks like indiscipline. It is a bug report
with a diff attached. Somebody read your abstraction, found where it did not fit their
real case, paid the cost of forking it and then the much larger cost of owning a fork
forever. That is someone valuing their case highly enough to buy it at a terrible price.
Wrapper scripts say the same kind of thing in a different accent, usually that the
interface asks for too much before it does anything.

Some people build tooling purely for the pleasure of it. But the workarounds that
spread, the ones other engineers copy, spread because someone hit a wall hard enough to
pay for going around it. Stamp them out and you get compliance without adoption: the
platform is used because it is mandatory, everyone resents it, and you have destroyed
the only channel telling you the truth.

## When the workaround is the incident

That argument has a boundary, and most writing on this subject refuses to draw it.

Sometimes the bypassed control is not user research. It is the incident. I have worked
in cloud security and in financial services, and in a regulated environment a routed-around
approval can be a reportable failure rather than a comment on your interface design.

The test I use is what the step was buying, and for whom. If it costs the person
performing it time and buys them nothing they can name, that is a design defect and the
workaround is telling you to fix it. If it buys someone else, a customer or a regulator,
protection from something they cannot see from where they stand, then it is a control
failure and the answer is enforcement.

Which means some paths should be mandatory and unpleasant, and the platform team does
not get to count adoption there as a win. What you owe those users is the unpleasantness
budget spent everywhere else. If someone has to sit through a control that exists for
the regulator, nothing adjacent to it should waste thirty seconds of their day.

## Agents are the new user, and they cannot ask in Slack

I have spent the last stretch of my career building agents that run in production, and
what I did not anticipate is that they make this measurable.

The standing objection to "go time how long a new engineer takes to get one real thing
working" was that the platform team cannot run the test. A clean machine does not give
you a clean head. You still know which credential to request and which permission
exists, so you time yourself on a task you have already internalised and conclude
onboarding is fine.

An agent has a clean head by construction. Point one at your getting-started path with
nothing but your documentation and your CLI, and it fails exactly where the knowledge
was tribal rather than written. It cannot ask a colleague or infer the permission nobody
wrote down. Every place it stalls is a place a new hire stalls too, and unlike the new
hire it leaves a transcript.

The failure modes change as well. A human meets a confusing error, shrugs, guesses right
and forgets it happened. An agent retries, then retries, then takes a confident wrong
action. Ambiguity that people absorb silently becomes expensive and legible. If your
error messages have been bad for three years and nobody complained, agents will
complain, at volume, in your logs.

So the practice is not "write the getting-started path yourself." It is to hand the
whole path to an agent, keep the transcript, and treat every stall as a defect with an
owner. [SPECIFIC NEEDED: whether you have run this against a real onboarding path yet,
and what the biggest single blocker turned out to be. If you have not, say so plainly.]

## What I would want to be measured on

Handed a platform tomorrow that most teams had quietly opted out of, I would not start
with architecture. I would spend the first weeks finding the shadow tooling, which mostly
means asking people what they actually run in a way that credibly cannot get anyone in
trouble. That last part is the hard bit, and it is a trust problem rather than a
technical one. Then sort what turns up into the two piles above: defects to absorb,
controls to enforce. Absorbing sometimes means deleting a feature I built and shipping
someone's script instead, which is harder to do than it sounds.

And I would want the platform to stay optional for as long as it possibly can. Mandate
is what you reach for when the product cannot win on its own, and it works, which is
what makes it dangerous. If adoption is compulsory I have no way of knowing whether I
built anything good, only that I built something people were not allowed to avoid.
