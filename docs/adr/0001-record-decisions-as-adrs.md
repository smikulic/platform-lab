# 0001. Record decisions as ADRs

- Status: accepted
- Date: 2026-11-20

## Context
This project is meant to teach distributed-systems engineering and be defensible in
interviews. Decisions made in chat or in our heads are forgotten or misremembered. The
repo is public, so reasoning should be visible to readers.

## Decision
Every significant technical decision gets a short ADR in `docs/adr/`, numbered
sequentially, following `0000-template.md`. Decisions are never edited away: if one
changes, the old ADR is marked superseded and a new one is added.

## Alternatives considered
- Notes in the README: they drift and lose history.
- Wiki or external docs: separated from the code and can go stale unseen.
- No written record: fastest now, but we lose the "why" within weeks.

## Consequences
Small overhead per decision. We gain a history of reasoning, including decisions that
turned out wrong, which is useful interview material.

## Revisit when
ADRs stop being written because the overhead feels too high, or they go unread.
