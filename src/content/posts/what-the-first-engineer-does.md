---
title: 'What the first engineer actually does'
description: >
  The technical work was the part I already knew how to do. The job turned out to be
  keeping track of what the company believed, with nobody to ratify the answer.
date: 2026-06-14
tags: ['startups', 'engineering', 'founding']
draft: true
---

When I joined Kivera as the first engineer I described the job as "a bit of everything
a startup needs". Accurate, and uninformative. Here is the version I would give now.

The expensive failures I have been part of at that stage were not technical. They were
disagreements nobody knew they were having, running for weeks, until something built on
top of one of them fell over.

## The company is the system you are debugging

Radar and network monitoring leave you with the same habit: when you cannot see the
fault, suspect your instrument before you conclude there is no fault. At a startup the
system I was operating inside included the company, and its most expensive fault was the
undocumented shared assumption.

A code dependency is at least declared. There is an import graph, you can grep it,
changing the thing hands you a list of what breaks. A shared assumption has no import
graph. Nobody can enumerate what reads from it, and it fails the way undeclared
dependencies always fail: downstream, later, in work owned by someone who never knew they
were coupled to you.

The symptom is mundane. Two people agree in a meeting and then produce work that does not
fit together. My first diagnosis was wrong in the same direction every time: I read it as
a communication problem, decided somebody had been unclear, and explained harder. Nothing
was wrong with the transmission. We were holding different premises, and the words we both
used fit both.

[SPECIFIC NEEDED: one instance at problem-space altitude. The symptom, what you first
assumed was broken, and what made the real disagreement visible.]

There is no architecture review at zero to one, no staff engineer who catches this. You
decide, you ship, and reality tells you eventually. So you build a substitute, and that is
the part of the job that separates people. Mine was a running document of what we believed
to be true and what we were betting on, written specifically enough to be wrong. Vague
statements survive disagreement comfortably. [SPECIFIC NEEDED: the document's form, how
often it was updated, one thing it caught.]

Asking someone to confirm in writing a thing you both believe you already agree on reads
as faintly hostile the first few times, which is exactly why it works. You manufacture the
disagreement while it is still cheap.

## Which things are questions

Most of what you build in year one is a question, and questions should be cheap to ask.
The hard part is telling questions from foundations before the fact. Gold-plate something
that dies in a month and you have burnt a month. Treat your auth model as a throwaway and
you pay interest on it for years.

I have called this wrong. [SPECIFIC NEEDED: the thing you treated as provisional that
turned out to be load-bearing, how long you lived with it, what unwinding it cost.]

The test I use now ignores intent. Once anything else reads from a thing it has stopped
being a question, whatever I meant when I wrote it. Intent is not a property the rest of
the system can observe.

## The seat exists inside bigger companies

At Lendi I built Meet Leeni, a call-transcription tool for mortgage brokers. No spec
arrived. The users were not engineers and could not have written one, because what they
wanted was to stop losing things they had heard in a conversation. Working out what the
product was took more of me than building it did.

Nullify was that job with the ambiguity moved up a level. Agents in front of real work
force questions with no settled answers anywhere: what an agent may conclude on its own,
what belongs in context versus what it should fetch, how you tell a memory failure from a
reasoning failure when the output looks identical. I built the triage system there from
zero, and very little of the difficulty was in the code.

So the seat is not a company stage. It appears wherever nobody upstream has decided what
should be built, and it is the one I want: the technical question, the product question
and the business question on one desk, impossible to pretend are separate concerns.

If I take it, the first thing I write will not be a service or a schema. It will be the
list of things we believe are true, dated, with names against them.
