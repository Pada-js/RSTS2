# RSTS2

RSTS2 is a small static web app made to generate custom **Slay the Spire 2** runs with random ascension, random characters, and random compatible modifiers.

The goal is simple: open the app, hit `Randomize Run`, and get a run sheet that is easy to read, easy to share, and flexible enough to match the kind of chaos you actually want to play.

https://pada-js.github.io/RSTS2/

## What It Does

- Rolls an ascension level between `0` and `10`
- Picks characters for each player from the 5 playable classes
- Allows duplicate characters across players
- Rolls up to `18` modifiers from a total pool of `20`
- Keeps `Draft`, `Sealed Deck`, and `Insanity` mutually exclusive
- Supports optional player names
- Supports manual seeds for reproducible runs
- Saves your local setup, filters, and presets in the browser
- Exports the generated run sheet as an image

## Features

### Run generation

- Full run randomization with a staged reveal
- Seed-based generation
- Difficulty meter with tiered labels
- Character portraits and modifier icons
- Run sheet designed for readability and quick sharing

### Customization

- Enable or disable individual ascensions
- Enable or disable individual characters
- Enable or disable individual modifiers
- `Select all` / `Clear all` actions for each category
- Validation to prevent invalid filter states

### Presets and local save

- Save filter presets locally
- Reload or delete saved presets
- Automatically keeps your current setup in `localStorage`

## Notes

- Clipboard image export may still depend on browser support and permissions.
- Presets and saved settings are stored locally in the browser, so they are not shared between devices.
- This project is intended as a fan utility and is not affiliated with Mega Crit.

## License

MIT License
