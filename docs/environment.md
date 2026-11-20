# Development environment

## Machine
- Mac: Apple Silicon (arm64), 14 CPUs, 24 GiB RAM, macOS 15 (Darwin 24.6)
- Container runtime: Docker Desktop
- Docker VM limits: 14 CPUs, 7.748 GiB memory (intentionally unchanged, see ADR 0002)

## Toolchain (record versions as found, do not guess)
- Node: v24.11.1   npm: 11.6.2   pnpm: 10.22.0
- Why I chose this pnpm install method: [one sentence]
- git: 2.39.5 (Apple Git-154)   gh: command not found   jq: jq-1.7.1-apple

## Baseline
- Free disk at start: 152 GiB of 926 GiB
- `docker system df` at start:

TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          5         5         2.711GB   0B (0%)
Containers      5         0         176.1kB   176.1kB (100%)
Local Volumes   8         8         182.2MB   0B (0%)
Build Cache     573       0         20.58GB   20.58GB

## Rules
1. Every container gets an explicit memory limit.
2. Measure with `docker stats`, never guess.
3. A VM-level OOM kill is an environment failure, never an experiment result.
