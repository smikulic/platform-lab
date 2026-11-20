# 0002. Local resource budget: keep Docker Desktop at 7.7 GiB

- Status: accepted
- Date: 2026-11-20

## Context
The development Mac has 24 GiB RAM and 14 CPUs. Docker Desktop's Linux VM is limited to
7.748 GiB. The project will eventually run an app, Postgres, RabbitMQ, a k3d cluster and an
observability stack (Prometheus, Loki, Tempo, Grafana) on that VM.

## Decision
Keep the Docker Desktop VM at its current 7.7 GiB limit. Reason: Keep local mac memory default.
Give every container an explicit memory limit, split the stack into Compose profiles, and keep
observability lean (single-binary Loki and Tempo, short retention).

## Alternatives considered
- Raise the VM limit (for example to ~14 GiB): easiest, but hides sizing problems and leaves
  less RAM for macOS.
- Run fewer components at once: adopted partially, through Compose profiles.
- Move heavy components (observability) off the laptop: more setup, deferred.

## Consequences
- Every container needs a measured memory limit (`docker stats`), not a guess.
- M4 and M5 may need a slimmer observability setup than a default install.
- A VM-level OOM kill is an environment failure and must never be presented as an experiment
  result, because the kernel picks an unpredictable victim.

## Revisit when
During M4 or M5, total VM memory stays above ~90% for sustained periods, or any container is
killed for VM-level (not its own limit) memory pressure, and trimming (profiles, fewer
components, lower retention) does not resolve it. Decide with `docker stats` evidence.
