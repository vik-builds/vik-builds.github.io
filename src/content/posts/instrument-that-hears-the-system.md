---
title: 'The instrument that hears the system'
description: >
  Radar makes you state how many false alarms you can live with before you build
  anything. Almost no software team does, which is most of what we call alert fatigue.
date: 2026-07-12
tags: ['networks', 'observability', 'systems', 'agents']
draft: false
---

My undergraduate degree was in electronics and communications, which meant several years
on one question: how do you know something is there when everything around it is noise?

That's radar. You send energy out, some fraction comes back, and almost all of what comes
back is useless. Ground clutter, atmospheric return, interference, the reflection of
things you don't care about. Whether you find the target depends much less on the target
than on the instrument.

I published three papers on variations of that: fuzzy logic for detection in MIMO radar,
metaheuristics applied to target tracking, and the one I still think about, which
tracked a submarine through non-linear motion with an Extended Kalman Filter. The EKF was
the right call for the usual reasons, cheap and real time and accurate while the motion
model is roughly right. The cost is less advertised. It linearises around the current
estimate, so when the target manoeuvres harder than the model assumes it doesn't degrade
gracefully. It diverges, and carries on reporting a track with a tight covariance while
the target is somewhere else. A confident wrong answer is worse than no answer, because
you act on it.

## The number nobody says out loud

The most useful thing radar gave me is the one I've had least success transferring: a
discipline about false alarms.

You don't tune sensitivity until it feels about right. You decide up front how many false
alarms per hour an operator can absorb before they stop trusting the display, and the
threshold falls out of that. Constant false alarm rate processing exists for this reason:
the threshold moves as the clutter moves, because the thing held fixed is the rate you
promised. I have almost never seen a software team state that number. Thresholds get tuned
by feel, down when something is missed, up when the channel gets noisy. Eventually the
on-call rotation stops reading the channel and we call it alert fatigue.

Which I think is mislabelled, and this is the part I'd argue with someone about. The
problem is rarely too many alerts. It's that nobody decided how many were acceptable, so
there's no threshold anyone can be wrong about, and no way to tell a tuning failure from a
detection failure. A team that says "we'll accept this many false positives a week to
catch this class of thing" has made a decision you can evaluate. A team that says its
alerts are noisy has made an observation. In security the budget should probably be set
uncomfortably high, because the asymmetry between a wasted hour and a missed compromise
isn't close, and the reflex to cut alert volume optimises the cheaper side of it.

## The same problem, one layer up

My master's thesis was about monitoring the network behaviour of enterprise hosts, in real
time, at a scale where inspecting everything isn't available to you. It took me
embarrassingly long to notice this was the radar problem again.

A host emits a signature: who it talks to, how often, in what volume, at what hours, with
what periodicity. A compromised host emits a slightly different one. Often just wrong in a
way that's obvious in hindsight and invisible at the time. Beaconing a little too regular
to be a human. Fan-out to destinations nothing else in the fleet has contacted.

Building on Ryu and Mininet, with NFF-go on the data path, meant working from a reduced
view rather than full capture, and that reduction is a decision about which detections you
are prepared to never make.

Two things I'd say more loudly now than I did in 2019. Mininet is an emulation
environment, so everything I measured was only as good as my traffic model: the work showed
the instrument functioned, not that it functioned on the world. And the discipline is not
identical across domains, which I used to claim. It rhymes, and not everywhere. In radar I
had a propagation model and, in the lab, an answer key. Watching enterprise hosts I had
neither, which makes it considerably easier for a story you told yourself to pass as a
detection.

## Where it kept turning up

Cloud estates emit continuously, and the retry storm is the cleanest example of the
listening problem I know. A dependency slows, callers retry, the retries synchronise
because one event triggered all of them, and the error rate dashboard shows it long after
correlation across independent callers would have.

Products took me longest. At Lendi I built Meet Leeni, a call transcription tool for
mortgage brokers, and the interesting signal was never in the transcription. It was in
what brokers did with a call once it ended, which bore little relationship to what they
told us they wanted. Feature requests are the processed output of a user's own analysis.
By the time one is tidy enough to file, the part worth knowing has been averaged out of it.

## Context is a detection threshold

For the eighteen months I spent at Nullify building agents that ran in production, this
was more directly useful than at any point since the thesis.

Retrieval is a threshold decision. Permissive, and you flood the context window with
clutter, and the answer degrades in a way that presents as a reasoning failure and is
actually signal to noise. Aggressive, and you drop the one document the answer depended
on. You can't improve both sides at once. You choose which error you'd rather make.

Agent memory is integration time. In radar you accumulate returns for longer to pull a
weak target out of the noise, and the price is that anything moving quickly smears across
the window and vanishes. Memory does the same. Accumulate more history and the agent gets
better at slow, stable facts about a codebase or a person, and worse at noticing that
something changed this morning. Deciding how long an agent remembers is the same decision
as deciding what it's allowed to miss.

I built the triage system there from zero to one, which is detection and prioritisation in
different clothes: a lot of candidates, a small fraction that matter, and a human whose
trust you spend every time you're wrong. What I'd defend now is the ordering: work out
what the person at the other end can absorb, then derive the threshold, rather than
shipping a threshold and tuning it when people complain.

## When this is the wrong instinct

I used to close this by conceding that plenty of good work starts instead from a strong
opinion about what should exist. That's too generous to me and not much use to anyone.

Listening is wrong in one specific regime: when there is no system yet. In a genuinely new
category nothing is emitting, nobody is behaving, there's no telemetry to read, and waiting
for signal is a respectable-looking way to lose to someone who guessed. Before something
exists to listen to, someone has to hold an opinion and pay for it.

The harder case is that even when the system is emitting you usually have to commit before
the reading is clean, and that is most of the job. What the habit buys you there is an
honest account of your own uncertainty: which part of the reading is the system, which
part is your filter, and what would change your mind.

Thirteen years in, I'm more suspicious of clean data than I was at the start. When a
signal looks unambiguous the likeliest explanation is my own filtering. In radar that's a
false track. In product it's usually a metric someone optimised until it stopped measuring
anything. Hindsight separates them reliably, and hindsight isn't on hand at the moment you
have to decide. That part of the instrument I'm still building.
