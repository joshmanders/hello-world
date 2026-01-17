# Contributing to Hello World!

```
 _    _      _
| |  | |    | |
| |  | | ___| | ___ ___  _ __ ___   ___
| |/\| |/ _ \ |/ __/ _ \| '_ ` _ \ / _ \
\  /\  /  __/ | (_| (_) | | | | | |  __/_
 \/  \/ \___|_|\___\___/|_| |_| |_|\___( )
                                       |/
```

**Welcome, fellow web surfer!** Thanks for your interest in contributing to the FIRST app ever deployed to Primcloud.

This is a **fun project** first and foremost. We embrace the chaotic beauty of 90s web design, and we encourage you to bring that same creative energy to your contributions. If it would've been cool in 1997, it's probably cool here.

That said, let's keep the code itself reasonably clean - just because our CSS says `blink` doesn't mean our codebase should be a mess.

---

## Prerequisites

Before you start hacking, make sure you have:

- **Node.js** v18 or higher
- **PostgreSQL** for the database
- **Docker** (required for running tests - keeps things consistent with CI)

## Getting Started

1. Fork the repo and clone it locally
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure your database
4. Set up the database: `npm run db:push`
5. Start the dev server: `npm run dev`

Check the [README](README.md) for more detailed setup instructions.

---

## Testing

We use Playwright for end-to-end and visual regression testing. **Tests run in Docker** to ensure consistency between your local environment and CI (which runs on Linux).

### Running Tests

```bash
# Run the full test suite (in Docker)
npm test

# Update visual snapshots after intentional UI changes
npm run test:update-snapshots
```

### Why Docker?

Visual regression tests compare screenshots pixel-by-pixel. Different operating systems render fonts slightly differently, which can cause false failures. Running tests in Docker ensures everyone gets the same results as CI.

**Note:** You'll need Docker running before you can run tests.

### When to Update Snapshots

If you intentionally change the UI (styling, layout, new components), you'll need to update the baseline snapshots:

```bash
npm run test:update-snapshots
```

Review the changes in the `tests/*-snapshots/` directories to make sure they look correct, then commit them with your PR.

---

## Making Contributions

1. **Fork** the repository
2. **Create a branch** for your feature or fix
3. **Make your changes** - have fun with it!
4. **Run the tests** - make sure everything passes
5. **Submit a PR** - tell us what you built

We don't have strict commit message requirements. Just be descriptive enough that we know what changed.

---

## Style & Vibe

This project celebrates the golden age of the World Wide Web. We encourage:

- Retro aesthetics (marquees, rainbow text, animated GIFs, etc.)
- Fun easter eggs and hidden features
- Visitor counters, guestbooks, and other 90s staples
- Creative CSS that pushes boundaries
- That classic "under construction" energy

**What we're NOT looking for:**

- Modern, minimalist, "clean" design (save that for your portfolio)
- Corporate speak or enterprise patterns
- Over-engineering simple features
- Taking things too seriously

---

## What We'd Love to See

- **Bug fixes** - even retro sites should work
- **New retro features** - what's missing from our 90s experience?
- **Performance improvements** - fast like dial-up... wait, no, the opposite
- **Accessibility improvements** - everyone should enjoy the retro web
- **Creative additions** - surprise us!

---

## Code of Conduct

Be excellent to each other. This is a fun project, so let's keep the vibes positive.

---

```
Thanks for stopping by!
You are contributor #000001 (probably)

[Sign the Guestbook!] [View Source] [Links] [Webrings]
```
