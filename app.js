const STORAGE_KEY = "rsts2-state-v2";
const MAX_ASCENSION = 10;
const MAX_PLAYERS = 4;

const characters = [
  {
    id: "ironclad",
    name: "Ironclad",
    accent: "#d94b3d",
    asset: "assets/ironclad-ui.png",
  },
  {
    id: "silent",
    name: "Silent",
    accent: "#789368",
    asset: "assets/silent-ui.png",
  },
  {
    id: "regent",
    name: "Regent",
    accent: "#ef7a35",
    asset: "assets/regent-ui.png",
  },
  {
    id: "necrobinder",
    name: "Necrobinder",
    accent: "#a37bb3",
    asset: "assets/necrobinder-ui.png",
  },
  {
    id: "defect",
    name: "Defect",
    accent: "#6a9bb2",
    asset: "assets/defect-ui.png",
  },
];

const exportPortraits = window.exportPortraits ?? {};
const exportModifierIcons = window.exportModifierIcons ?? {};

const modifiers = [
  { name: "Draft", type: "good", description: "Choose 10 card rewards to replace your starting deck.", group: "starter-deck" },
  { name: "Sealed Deck", type: "good", description: "Choose 10 out of 30 cards to replace your starting deck.", group: "starter-deck" },
  { name: "Hoarder", type: "good", description: "Whenever you add a card to your deck, add 2 additional copies. You can no longer remove cards from your deck at the Merchant." },
  { name: "Specialized", type: "good", description: "Start with 5 copies of a single card." },
  { name: "Insanity", type: "good", description: "Start with a random deck of 30 cards.", group: "starter-deck" },
  { name: "All Star", type: "good", description: "Start with 5 colorless cards." },
  { name: "Flight", type: "good", description: "You may ignore paths when choosing the next room to travel to." },
  { name: "Vintage", type: "good", description: "Normal enemies drop relics instead of cards." },
  { name: "Ironclad Cards", type: "good", description: "Ironclad cards will now appear in rewards and shops." },
  { name: "Silent Cards", type: "good", description: "Silent cards will now appear in rewards and shops." },
  { name: "Regent Cards", type: "good", description: "Regent cards will now appear in rewards and shops." },
  { name: "Necrobinder Cards", type: "good", description: "Necrobinder cards will now appear in rewards and shops." },
  { name: "Defect Cards", type: "good", description: "Defect cards will now appear in rewards and shops." },
  { name: "Deadly Events", type: "bad", description: "Unknown rooms can now contain Elites, but are also more likely to contain Treasure rooms." },
  { name: "Cursed Run", type: "bad", description: "At the start of each Act, add a random Curse to your deck." },
  { name: "Big Game Hunter", type: "bad", description: "Elite enemies swarm the Spire and drop better rewards." },
  { name: "Midas", type: "bad", description: "Enemies drop 200% more gold, but you can no longer Smith at Rest Sites." },
  { name: "Murderous", type: "bad", description: "You start each combat with 3 Strength. All enemies start combat with 3 Strength." },
  { name: "Night Terrors", type: "bad", description: "Resting at Rest Sites heals all of your HP, but costs 5 Max HP." },
  { name: "Terminal", type: "bad", description: "Whenever you enter a new room, lose 1 Max HP. Start each combat with 5 Plating." },
];

const modifierIcons = {
  Draft: "assets/modifiers/draft.png",
  "Sealed Deck": "assets/modifiers/sealed-deck.png",
  Hoarder: "assets/modifiers/hoarder.png",
  Specialized: "assets/modifiers/specialized.png",
  Insanity: "assets/modifiers/insanity.png",
  "All Star": "assets/modifiers/all-star.png",
  Flight: "assets/modifiers/flight.png",
  Vintage: "assets/modifiers/vintage.png",
  "Ironclad Cards": "assets/modifiers/ironclad-cards.png",
  "Silent Cards": "assets/modifiers/silent-cards.png",
  "Regent Cards": "assets/modifiers/regent-cards.png",
  "Necrobinder Cards": "assets/modifiers/necrobinder-cards.png",
  "Defect Cards": "assets/modifiers/defect-cards.png",
  "Deadly Events": "assets/modifiers/deadly-events.png",
  "Cursed Run": "assets/modifiers/cursed-run.png",
  "Big Game Hunter": "assets/modifiers/big-game-hunter.png",
  Midas: "assets/modifiers/midas.png",
  Murderous: "assets/modifiers/murderous.png",
  "Night Terrors": "assets/modifiers/night-terrors.png",
  Terminal: "assets/modifiers/terminal.png",
};

const modifierDifficulty = {
  Draft: -5,
  "Sealed Deck": -3,
  Hoarder: 4,
  Specialized: -3,
  Insanity: 5,
  "All Star": -4,
  Flight: -7,
  Vintage: -1,
  "Ironclad Cards": -1,
  "Silent Cards": -1,
  "Regent Cards": -1,
  "Necrobinder Cards": -1,
  "Defect Cards": -1,
  "Deadly Events": 7,
  "Cursed Run": 8,
  "Big Game Hunter": 9,
  Midas: 4,
  Murderous: 10,
  "Night Terrors": 11,
  Terminal: 14,
};

const difficultySynergies = [
  { names: ["Terminal", "Night Terrors"], value: 8 },
  { names: ["Murderous", "Big Game Hunter"], value: 6 },
  { names: ["Deadly Events", "Big Game Hunter"], value: 5 },
  { names: ["Flight", "Vintage"], value: -3 },
  { names: ["All Star", "Specialized"], value: -2 },
];

const playerCountInput = document.querySelector("#playerCount");
const modifierCountInput = document.querySelector("#modifierCount");
const seedInput = document.querySelector("#seedInput");
const playerNameFields = document.querySelector("#playerNameFields");
const randomizeBtn = document.querySelector("#randomizeBtn");
const customizeBtn = document.querySelector("#customizeBtn");
const exportImageBtn = document.querySelector("#exportImageBtn");
const presetNameInput = document.querySelector("#presetNameInput");
const presetSelect = document.querySelector("#presetSelect");
const savePresetBtn = document.querySelector("#savePresetBtn");
const loadPresetBtn = document.querySelector("#loadPresetBtn");
const deletePresetBtn = document.querySelector("#deletePresetBtn");
const presetStatus = document.querySelector("#presetStatus");

const customizeModal = document.querySelector("#customizeModal");
const closeCustomizeBtn = document.querySelector("#closeCustomizeBtn");
const applyCustomizeBtn = document.querySelector("#applyCustomizeBtn");
const customizeStatus = document.querySelector("#customizeStatus");
const ascensionOptions = document.querySelector("#ascensionOptions");
const characterOptions = document.querySelector("#characterOptions");
const modifierOptions = document.querySelector("#modifierOptions");

const ascensionValue = document.querySelector("#ascensionValue");
const playersValue = document.querySelector("#playersValue");
const modifiersValue = document.querySelector("#modifiersValue");
const seedValue = document.querySelector("#seedValue");
const difficultyLabel = document.querySelector("#difficultyLabel");
const difficultySummary = document.querySelector("#difficultySummary");
const difficultyFill = document.querySelector("#difficultyFill");
const characterGrid = document.querySelector("#characterGrid");
const modifierList = document.querySelector("#modifierList");
const rosterPreview = document.querySelector("#rosterPreview");
const statPills = Array.from(document.querySelectorAll(".stat-pill"));
const resultCard = document.querySelector(".result-card");
const difficultyPanel = document.querySelector(".difficulty-panel");

const state = {
  customization: {
    ascensions: new Set(Array.from({ length: MAX_ASCENSION + 1 }, (_, index) => index)),
    characters: new Set(characters.map((character) => character.id)),
    modifiers: new Set(modifiers.map((modifier) => modifier.name)),
  },
  playerNames: Array.from({ length: MAX_PLAYERS }, () => ""),
  presets: [],
};

let currentRun = null;
let revealToken = 0;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hashString(input) {
  let hash = 1779033703 ^ input.length;

  for (let index = 0; index < input.length; index += 1) {
    hash = Math.imul(hash ^ input.charCodeAt(index), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }

  hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
  hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
  return (hash ^ (hash >>> 16)) >>> 0;
}

function createRng(seed) {
  let value = hashString(seed);

  return () => {
    value += 0x6D2B79F5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInt(min, max, rng = Math.random) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function shuffle(items, rng = Math.random) {
  const cloned = [...items];

  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [cloned[index], cloned[swapIndex]] = [cloned[swapIndex], cloned[index]];
  }

  return cloned;
}

function saveLocalState() {
  const payload = {
    playerCount: playerCountInput.value,
    modifierCount: modifierCountInput.value,
    seed: seedInput.value,
    playerNames: state.playerNames,
    presets: state.presets,
    customization: {
      ascensions: [...state.customization.ascensions],
      characters: [...state.customization.characters],
      modifiers: [...state.customization.modifiers],
    },
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {}
}

function loadLocalState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);

    if (parsed.playerCount) {
      playerCountInput.value = parsed.playerCount;
    }

    if (parsed.modifierCount !== undefined) {
      modifierCountInput.value = parsed.modifierCount;
    }

    if (parsed.seed !== undefined) {
      seedInput.value = parsed.seed;
    }

    if (Array.isArray(parsed.playerNames)) {
      state.playerNames = Array.from({ length: MAX_PLAYERS }, (_, index) => parsed.playerNames[index] ?? "");
    }

    if (Array.isArray(parsed.presets)) {
      state.presets = parsed.presets.filter((preset) => preset && typeof preset.name === "string");
    }

    if (parsed.customization) {
      if (Array.isArray(parsed.customization.ascensions) && parsed.customization.ascensions.length > 0) {
        state.customization.ascensions = new Set(parsed.customization.ascensions);
      }

      if (Array.isArray(parsed.customization.characters) && parsed.customization.characters.length > 0) {
        state.customization.characters = new Set(parsed.customization.characters);
      }

      if (Array.isArray(parsed.customization.modifiers)) {
        state.customization.modifiers = new Set(parsed.customization.modifiers);
      }
    }
  } catch {}
}

function serializeCurrentSetup() {
  return {
    playerCount: getPlayerCountValue(),
    modifierCount: Number.parseInt(modifierCountInput.value, 10) || 0,
    seed: seedInput.value.trim(),
    playerNames: [...state.playerNames],
    customization: {
      ascensions: [...state.customization.ascensions],
      characters: [...state.customization.characters],
      modifiers: [...state.customization.modifiers],
    },
  };
}

function applySerializedSetup(setup) {
  playerCountInput.value = clamp(Number.parseInt(setup.playerCount, 10) || 1, 1, MAX_PLAYERS);
  modifierCountInput.value = clamp(Number.parseInt(setup.modifierCount, 10) || 0, 0, 18);
  seedInput.value = setup.seed ?? "";
  state.playerNames = Array.from({ length: MAX_PLAYERS }, (_, index) => setup.playerNames?.[index] ?? "");
  state.customization.ascensions = new Set(setup.customization?.ascensions ?? Array.from({ length: MAX_ASCENSION + 1 }, (_, index) => index));
  state.customization.characters = new Set(setup.customization?.characters ?? characters.map((character) => character.id));
  state.customization.modifiers = new Set(setup.customization?.modifiers ?? modifiers.map((modifier) => modifier.name));
  getPlayerCountValue();
  getRequestedModifierCount();
  renderPlayerNameFields();
  buildRosterPreview();
}

function renderPresetOptions(selectedName = presetSelect.value) {
  presetSelect.innerHTML = '<option value="">No preset selected</option>';

  state.presets
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((preset) => {
      const option = document.createElement("option");
      option.value = preset.name;
      option.textContent = preset.name;
      presetSelect.append(option);
    });

  presetSelect.value = state.presets.some((preset) => preset.name === selectedName) ? selectedName : "";
}

function setPresetStatus(message, isError = false) {
  presetStatus.textContent = message;
  presetStatus.classList.toggle("is-error", isError);
}

function getPlayerCountValue() {
  const value = Number.parseInt(playerCountInput.value, 10) || 1;
  const clamped = clamp(value, 1, MAX_PLAYERS);
  playerCountInput.value = clamped;
  return clamped;
}

function getEnabledCharacters() {
  return characters.filter((character) => state.customization.characters.has(character.id));
}

function getEnabledModifiers() {
  return modifiers.filter((modifier) => state.customization.modifiers.has(modifier.name));
}

function getMaxSelectableModifiers() {
  const availableModifiers = getEnabledModifiers();
  const starterDeckCount = availableModifiers.filter((modifier) => modifier.group === "starter-deck").length;
  return availableModifiers.length - Math.max(0, starterDeckCount - 1);
}

function getRequestedModifierCount(rng = Math.random) {
  const rawValue = Number.parseInt(modifierCountInput.value, 10);
  const maxSelectable = getMaxSelectableModifiers();

  if (rawValue === 0) {
    modifierCountInput.value = 0;
    return randomInt(0, maxSelectable, rng);
  }

  const value = Number.isNaN(rawValue) ? 1 : rawValue;
  const clamped = clamp(value, 0, maxSelectable);
  modifierCountInput.value = clamped;
  return clamped;
}

function getDisplayPlayerName(index) {
  const customName = state.playerNames[index]?.trim();
  return customName || `Player ${index + 1}`;
}

function renderPlayerNameFields() {
  playerNameFields.innerHTML = "";
  const playerCount = getPlayerCountValue();

  Array.from({ length: playerCount }, (_, index) => {
    const label = document.createElement("label");
    label.className = "field player-name-field";
    label.innerHTML = `
      <span>${getDisplayPlayerName(index)}</span>
      <input type="text" maxlength="18" data-player-name="${index}" placeholder="Optional name" value="${state.playerNames[index] ?? ""}">
    `;
    playerNameFields.append(label);
  });
}

function buildRosterPreview() {
  rosterPreview.innerHTML = "";

  getEnabledCharacters().forEach((character) => {
    const article = document.createElement("article");
    article.className = "character-card";
    article.style.borderColor = `${character.accent}44`;

    article.innerHTML = `
      <img class="character-crest" src="${character.asset}" alt="${character.name}">
      <div class="character-name" style="color: ${character.accent};">${character.name}</div>
    `;

    rosterPreview.append(article);
  });
}

function drawCharacters(playerCount, rng) {
  const availableCharacters = getEnabledCharacters();
  return Array.from({ length: playerCount }, () => availableCharacters[randomInt(0, availableCharacters.length - 1, rng)]);
}

function drawModifiers(count, rng) {
  const remaining = shuffle(getEnabledModifiers(), rng);
  const picked = [];
  const blockedGroups = new Set();

  for (const modifier of remaining) {
    if (picked.length >= count) {
      break;
    }

    if (modifier.group && blockedGroups.has(modifier.group)) {
      continue;
    }

    picked.push(modifier);

    if (modifier.group) {
      blockedGroups.add(modifier.group);
    }
  }

  return picked;
}

function scoreToTier(score) {
  if (score >= 80) return "Nightmare";
  if (score >= 60) return "Brutal";
  if (score >= 42) return "Hard";
  if (score >= 24) return "Medium";
  return "Easy";
}

function getDifficultySummary(score, modifierNames) {
  if (score >= 82) return "A punishing run with very little room for mistakes.";
  if (score >= 64) return "High pressure from ascension and modifier synergy.";
  if (score >= 46) return "Demanding run with several dangerous pressure points.";
  if (score >= 28) return "Manageable, but the run can still spike if fights line up badly.";
  if (modifierNames.length === 0) return "Low pressure start with no active modifiers.";
  return "Comfortable run with favorable tools and a softer ruleset.";
}

function getSynergyAdjustment(modifierNames) {
  return difficultySynergies.reduce((total, synergy) => {
    return synergy.names.every((name) => modifierNames.includes(name)) ? total + synergy.value : total;
  }, 0);
}

function getMaxDifficultyRaw() {
  const modifierNames = modifiers
    .filter((modifier) => !["Draft", "Sealed Deck"].includes(modifier.name))
    .map((modifier) => modifier.name);
  const modifierRaw = modifierNames.reduce((total, name) => total + (modifierDifficulty[name] ?? 0), 0);
  return Math.max(1, (MAX_ASCENSION * 5.2) + modifierRaw + getSynergyAdjustment(modifierNames));
}

function calculateDifficulty(run) {
  let rawScore = run.ascension * 5.2;
  const modifierNames = run.modifiers.map((modifier) => modifier.name);

  run.modifiers.forEach((modifier) => {
    rawScore += modifierDifficulty[modifier.name] ?? 0;
  });

  rawScore += getSynergyAdjustment(modifierNames);

  let normalizedScore = Math.round(clamp((Math.max(0, rawScore) / getMaxDifficultyRaw()) * 100, 0, 100));
  const fullModifierRun = modifiers.length - 2;
  if (run.ascension === MAX_ASCENSION && run.modifiers.length === fullModifierRun) {
    normalizedScore = 100;
  }

  return {
    score: normalizedScore,
    tier: scoreToTier(normalizedScore),
    summary: getDifficultySummary(normalizedScore, modifierNames),
  };
}

function renderDifficulty(difficulty) {
  difficultyLabel.textContent = difficulty.tier;
  difficultySummary.textContent = difficulty.summary;
  difficultyFill.style.width = `${difficulty.score}%`;
  difficultyFill.dataset.tier = difficulty.tier.toLowerCase();
}

function pulseElement(element, className) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function renderCharacters(selectedCharacters, playerNames) {
  characterGrid.innerHTML = "";

  selectedCharacters.forEach((character, index) => {
    const article = document.createElement("article");
    article.className = "character-card reveal-card";
    article.style.borderColor = `${character.accent}55`;
    article.style.background = `linear-gradient(180deg, ${character.accent}1f, rgba(12, 14, 20, 0.95))`;
    article.style.animationDelay = `${index * 120}ms`;

    article.innerHTML = `
      <img class="character-crest" src="${character.asset}" alt="${character.name}">
      <div class="character-name">
        ${playerNames[index]}:
        <span style="color: ${character.accent};">${character.name}</span>
      </div>
    `;

    characterGrid.append(article);
  });
}

function renderModifiers(selectedModifiers) {
  modifierList.innerHTML = "";

  selectedModifiers.forEach((modifier, index) => {
    const item = document.createElement("li");
    item.className = `modifier-item modifier-type-${modifier.type} reveal-card`;
    item.style.animationDelay = `${index * 85}ms`;
    const iconMarkup = modifierIcons[modifier.name]
      ? `<img class="modifier-icon" src="${modifierIcons[modifier.name]}" alt="" loading="lazy" decoding="async">`
      : `<span class="modifier-dot" aria-hidden="true"></span>`;
    item.innerHTML = `
      <div class="modifier-topline">
        ${iconMarkup}
        <span class="modifier-name">${modifier.name}</span>
      </div>
      <div class="modifier-description">${modifier.description}</div>
    `;
    modifierList.append(item);
  });
}

function generateSeed() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 7 }, () => alphabet[randomInt(0, alphabet.length - 1)]).join("");
}

function setRollingState() {
  currentRun = null;
  ascensionValue.textContent = "...";
  playersValue.textContent = "...";
  modifiersValue.textContent = "...";
  seedValue.textContent = "--------";
  difficultyLabel.textContent = "...";
  difficultySummary.textContent = "Reading the Spire...";
  difficultyFill.style.width = "0%";
  delete difficultyFill.dataset.tier;
  characterGrid.innerHTML = "";
  modifierList.innerHTML = "";
  statPills.forEach((pill) => pill.classList.add("is-rolling"));
  resultCard.classList.add("is-revealing");
  exportImageBtn.disabled = true;
}

function clearRollingState() {
  statPills.forEach((pill) => pill.classList.remove("is-rolling"));
  window.setTimeout(() => {
    resultCard.classList.remove("is-revealing");
  }, 240);
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function rollValue(target, values, iterations = 8, delay = 65) {
  for (let index = 0; index < iterations; index += 1) {
    target.textContent = values[index % values.length];
    await wait(delay);
  }
}

function generateRun() {
  const playerCount = getPlayerCountValue();
  const manualSeed = seedInput.value.trim();
  const seed = manualSeed || generateSeed();
  const rng = createRng(seed);
  const modifierCount = getRequestedModifierCount(rng);
  const availableAscensions = Array.from(state.customization.ascensions);
  const playerNames = Array.from({ length: playerCount }, (_, index) => getDisplayPlayerName(index));

  if (!manualSeed) {
    seedInput.value = "";
  }
  saveLocalState();

  return {
    seed,
    ascension: availableAscensions[randomInt(0, availableAscensions.length - 1, rng)],
    playerCount,
    playerNames,
    characters: drawCharacters(playerCount, rng),
    modifiers: drawModifiers(modifierCount, rng),
  };
}

async function revealRun(run) {
  const token = ++revealToken;
  const difficulty = calculateDifficulty(run);
  randomizeBtn.disabled = true;
  randomizeBtn.textContent = "Revealing...";
  setRollingState();

  await Promise.all([
    rollValue(ascensionValue, Array.from({ length: 11 }, (_, index) => `A${index}`), 7, 70),
    rollValue(playersValue, Array.from({ length: MAX_PLAYERS }, (_, index) => `${index + 1}`), 6, 72),
    rollValue(modifiersValue, Array.from({ length: 19 }, (_, index) => `${index}`), 8, 68),
  ]);

  if (token !== revealToken) return;

  ascensionValue.textContent = `A${run.ascension}`;
  pulseElement(statPills[0], "is-hit");
  await wait(140);
  if (token !== revealToken) return;

  playersValue.textContent = `${run.playerCount}`;
  pulseElement(statPills[1], "is-hit");
  await wait(140);
  if (token !== revealToken) return;

  modifiersValue.textContent = `${run.modifiers.length}`;
  pulseElement(statPills[2], "is-hit");
  await wait(120);
  if (token !== revealToken) return;

  await rollValue(seedValue, ["RUNNING", "DRAWING", "SHUFFLE", "SPIRIT"], 5, 58);
  if (token !== revealToken) return;
  seedValue.textContent = run.seed;
  pulseElement(statPills[3], "is-hit");
  clearRollingState();

  await wait(170);
  if (token !== revealToken) return;
  renderDifficulty(difficulty);
  pulseElement(difficultyPanel, "is-hit");

  await wait(150);
  if (token !== revealToken) return;
  renderCharacters(run.characters, run.playerNames);

  await wait(220);
  if (token !== revealToken) return;
  renderModifiers(run.modifiers);

  currentRun = { ...run, difficulty };
  randomizeBtn.disabled = false;
  randomizeBtn.textContent = "Randomize Run";
  exportImageBtn.disabled = false;
}

function createCheckboxOption({ value, label, description = "", checked, group, image = "", tone = "" }) {
  const wrapper = document.createElement("label");
  wrapper.className = `filter-option${tone ? ` filter-option-${tone}` : ""}`;
  const descriptionMarkup = description ? `<div class="filter-option-description">${description}</div>` : "";
  const imageMarkup = image ? `<img class="filter-character-icon" src="${image}" alt="">` : "";

  wrapper.innerHTML = `
    <input type="checkbox" value="${value}" data-filter-group="${group}" ${checked ? "checked" : ""}>
    ${imageMarkup}
    <div>
      <div class="filter-option-name">${label}</div>
      ${descriptionMarkup}
    </div>
  `;

  return wrapper;
}

function renderCustomizationOptions() {
  ascensionOptions.innerHTML = "";
  characterOptions.innerHTML = "";
  modifierOptions.innerHTML = "";

  Array.from({ length: MAX_ASCENSION + 1 }, (_, value) => {
    ascensionOptions.append(createCheckboxOption({
      value,
      label: `A${value}`,
      checked: state.customization.ascensions.has(value),
      group: "ascensions",
    }));
  });

  characters.forEach((character) => {
    characterOptions.append(createCheckboxOption({
      value: character.id,
      label: character.name,
      checked: state.customization.characters.has(character.id),
      group: "characters",
      image: character.asset,
    }));
  });

  modifiers.forEach((modifier) => {
    modifierOptions.append(createCheckboxOption({
      value: modifier.name,
      label: modifier.name,
      description: modifier.description,
      checked: state.customization.modifiers.has(modifier.name),
      group: "modifiers",
      tone: modifier.type,
    }));
  });
}

function setGroupSelection(group, shouldSelectAll) {
  document.querySelectorAll(`[data-filter-group="${group}"]`).forEach((input) => {
    input.checked = shouldSelectAll;
  });
}

function collectCustomizationDraft() {
  const draft = {
    ascensions: new Set(),
    characters: new Set(),
    modifiers: new Set(),
  };

  document.querySelectorAll('[data-filter-group="ascensions"]').forEach((input) => {
    if (input.checked) {
      draft.ascensions.add(Number.parseInt(input.value, 10));
    }
  });

  document.querySelectorAll('[data-filter-group="characters"]').forEach((input) => {
    if (input.checked) {
      draft.characters.add(input.value);
    }
  });

  document.querySelectorAll('[data-filter-group="modifiers"]').forEach((input) => {
    if (input.checked) {
      draft.modifiers.add(input.value);
    }
  });

  return draft;
}

function validateCustomizationDraft(draft) {
  const issues = [];
  if (draft.ascensions.size === 0) issues.push("select at least one ascension");
  if (draft.characters.size === 0) issues.push("select at least one character");
  return issues;
}

function updateCustomizationValidation() {
  const issues = validateCustomizationDraft(collectCustomizationDraft());
  applyCustomizeBtn.disabled = issues.length > 0;
  customizeStatus.classList.toggle("is-error", issues.length > 0);
  customizeStatus.textContent = issues.length > 0 ? `Missing: ${issues.join(" and ")}.` : "";
}

function openCustomizationModal() {
  renderCustomizationOptions();
  updateCustomizationValidation();
  customizeModal.hidden = false;
}

function closeCustomizationModal() {
  customizeModal.hidden = true;
}

function initializeFromLocalState() {
  loadLocalState();
  getPlayerCountValue();
  getRequestedModifierCount();
  renderPlayerNameFields();
  buildRosterPreview();
  renderPresetOptions();
}

function savePreset() {
  const name = presetNameInput.value.trim();

  if (!name) {
    setPresetStatus("Enter a preset name first.", true);
    return;
  }

  const serialized = serializeCurrentSetup();
  const existingIndex = state.presets.findIndex((preset) => preset.name.toLowerCase() === name.toLowerCase());
  const nextPreset = { name, ...serialized };

  if (existingIndex >= 0) {
    state.presets[existingIndex] = nextPreset;
    setPresetStatus(`Preset "${name}" updated.`);
  } else {
    state.presets.push(nextPreset);
    setPresetStatus(`Preset "${name}" saved.`);
  }

  renderPresetOptions(name);
  saveLocalState();
}

function loadPreset() {
  const selectedName = presetSelect.value;
  const preset = state.presets.find((entry) => entry.name === selectedName);

  if (!preset) {
    setPresetStatus("Choose a preset to load.", true);
    return;
  }

  applySerializedSetup(preset);
  presetNameInput.value = preset.name;
  renderPresetOptions(preset.name);
  saveLocalState();
  setPresetStatus(`Preset "${preset.name}" loaded.`);
}

function deletePreset() {
  const selectedName = presetSelect.value || presetNameInput.value.trim();
  const existingIndex = state.presets.findIndex((preset) => preset.name === selectedName);

  if (existingIndex < 0) {
    setPresetStatus("Choose a preset to delete.", true);
    return;
  }

  const [removed] = state.presets.splice(existingIndex, 1);
  presetNameInput.value = "";
  renderPresetOptions("");
  saveLocalState();
  setPresetStatus(`Preset "${removed.name}" deleted.`);
}

function drawWrappedText(context, text, x, y, maxWidth, lineHeight, color) {
  context.fillStyle = color;
  const words = text.split(" ");
  let line = "";
  let cursorY = y;

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else {
      line = testLine;
    }
  });

  if (line) {
    context.fillText(line, x, cursorY);
    cursorY += lineHeight;
  }

  return cursorY;
}

function getInitials(text) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function fitText(context, text, maxWidth, initialSize, weight = "700", family = "Cinzel") {
  let size = initialSize;
  while (size > 12) {
    context.font = `${weight} ${size}px ${family}`;
    if (context.measureText(text).width <= maxWidth) {
      return size;
    }
    size -= 1;
  }
  return size;
}

async function loadImageAsDataUrl(src) {
  if (typeof src === "string" && src.startsWith("data:")) {
    return src;
  }

  try {
    const response = await fetch(src);
    if (!response.ok) {
      throw new Error("Image fetch failed");
    }

    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function loadCanvasSafeImage(src) {
  const dataUrl = await loadImageAsDataUrl(src);
  if (!dataUrl) {
    return null;
  }

  return await new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = dataUrl;
  });
}

function addRoundedRectPath(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.arcTo(x + width, y, x + width, y + r, r);
  context.lineTo(x + width, y + height - r);
  context.arcTo(x + width, y + height, x + width - r, y + height, r);
  context.lineTo(x + r, y + height);
  context.arcTo(x, y + height, x, y + height - r, r);
  context.lineTo(x, y + r);
  context.arcTo(x, y, x + r, y, r);
  context.closePath();
}

function fillRoundedRect(context, x, y, width, height, radius) {
  addRoundedRectPath(context, x, y, width, height, radius);
  context.fill();
}

function strokeRoundedRect(context, x, y, width, height, radius) {
  addRoundedRectPath(context, x, y, width, height, radius);
  context.stroke();
}

async function exportRunImage() {
  if (!currentRun) {
    return;
  }

  exportImageBtn.disabled = true;
  exportImageBtn.textContent = "Copying...";

  try {
    const width = 1600;
    const modifierColumns = currentRun.modifiers.length > 10 ? 3 : 2;
    const modifierGapX = 14;
    const modifierGapY = 16;
    const modifierCardWidth = modifierColumns === 3 ? 196 : 302;
    const modifierCardHeight = modifierColumns === 3 ? 58 : 62;
    const modifierBaseX = 860;
    const modifierBaseY = 490;
    const modifierRows = Math.max(1, Math.ceil(currentRun.modifiers.length / modifierColumns));
    const modifierSectionBottom = modifierBaseY + (modifierRows * modifierCardHeight) + ((modifierRows - 1) * modifierGapY);
    const characterSectionBottom = 700;
    const contentBottom = Math.max(characterSectionBottom, modifierSectionBottom);
    const height = Math.max(900, contentBottom + 100);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    const background = context.createLinearGradient(0, 0, 0, height);
    background.addColorStop(0, "#29140f");
    background.addColorStop(1, "#09070b");
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    const glow = context.createRadialGradient(260, 220, 20, 260, 220, 380);
    glow.addColorStop(0, "rgba(228,110,56,0.42)");
    glow.addColorStop(1, "rgba(228,110,56,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    context.fillStyle = "rgba(24, 20, 27, 0.92)";
    context.strokeStyle = "rgba(239, 197, 106, 0.24)";
    context.lineWidth = 2;
    fillRoundedRect(context, 60, 60, width - 120, height - 120, 32);
    strokeRoundedRect(context, 60, 60, width - 120, height - 120, 32);

    const exportAppIcon = await loadCanvasSafeImage("assets/app-icon.svg");
    if (exportAppIcon) {
      context.drawImage(exportAppIcon, 100, 84, 24, 24);
    }

    context.fillStyle = "#efc56a";
    context.font = "700 22px Cinzel";
    context.fillText("RSTS2", 136, 110);

    context.fillStyle = "#f3eee5";
    context.font = "700 62px Cinzel";
    context.fillText("Run Sheet", 100, 185);

    context.fillStyle = "#ccbba4";
    context.font = "400 28px Crimson Text";
    context.fillText(`Seed ${currentRun.seed}  |  A${currentRun.ascension}  |  ${currentRun.playerCount} Players  |  ${currentRun.difficulty.tier}`, 100, 235);

    const statTitles = [
      ["Ascension", `A${currentRun.ascension}`],
      ["Players", `${currentRun.playerCount}`],
      ["Modifiers", `${currentRun.modifiers.length}`],
      ["Difficulty", currentRun.difficulty.tier],
    ];

    statTitles.forEach(([label, value], index) => {
      const x = 100 + (index * 330);
      context.fillStyle = "rgba(56, 41, 32, 0.9)";
      fillRoundedRect(context, x, 280, 280, 110, 22);
      context.strokeStyle = "rgba(239, 197, 106, 0.16)";
      strokeRoundedRect(context, x, 280, 280, 110, 22);
      context.fillStyle = "#ccbba4";
      context.font = "400 24px Crimson Text";
      context.fillText(label, x + 22, 320);
      context.fillStyle = "#ffdc8d";
      context.font = "700 34px Cinzel";
      context.fillText(value, x + 22, 365);
    });

    context.fillStyle = "#efc56a";
    context.font = "700 22px Cinzel";
    context.fillText("Selected Characters", 100, 455);

    for (const [index, character] of currentRun.characters.entries()) {
      const x = 100 + (index * 180);
      context.fillStyle = "rgba(20, 22, 29, 0.94)";
      fillRoundedRect(context, x, 480, 150, 220, 24);
      context.strokeStyle = `${character.accent}55`;
      strokeRoundedRect(context, x, 480, 150, 220, 24);

      const portrait = await loadCanvasSafeImage(exportPortraits[character.id] ?? character.asset);
      if (portrait) {
        context.save();
        addRoundedRectPath(context, x + 26, 500, 98, 132, 14);
        context.clip();
        context.drawImage(portrait, x + 26, 500, 98, 132);
        context.restore();
        context.strokeStyle = `${character.accent}88`;
        strokeRoundedRect(context, x + 26, 500, 98, 132, 14);
      } else {
        context.fillStyle = `${character.accent}22`;
        fillRoundedRect(context, x + 26, 500, 98, 132, 14);
        context.strokeStyle = `${character.accent}88`;
        strokeRoundedRect(context, x + 26, 500, 98, 132, 14);
        context.fillStyle = character.accent;
        context.font = "700 34px Cinzel";
        context.fillText(getInitials(character.name), x + 48, 578);
      }

      context.fillStyle = "#ccbba4";
      context.font = "400 22px Crimson Text";
      context.fillText(currentRun.playerNames[index], x + 16, 666);
      context.fillStyle = character.accent;
      context.font = `700 ${fitText(context, character.name, 118, 23)}px Cinzel`;
      drawWrappedText(context, character.name, x + 16, 694, 118, 24, character.accent);
    }

    context.fillStyle = "#efc56a";
    context.font = "700 22px Cinzel";
    context.fillText("Active Modifiers", 860, 455);

    const modifierFontSize = modifierColumns === 3 ? 14 : 18;
    const modifierTextWidth = modifierColumns === 3 ? 122 : 208;
    const modifierIconSize = modifierColumns === 3 ? 24 : 28;

    for (const [index, modifier] of currentRun.modifiers.entries()) {
      const column = index % modifierColumns;
      const row = Math.floor(index / modifierColumns);
      const modifierX = modifierBaseX + (column * (modifierCardWidth + modifierGapX));
      const modifierY = modifierBaseY + (row * (modifierCardHeight + modifierGapY));
      context.fillStyle = "rgba(20, 22, 29, 0.9)";
      fillRoundedRect(context, modifierX, modifierY, modifierCardWidth, modifierCardHeight, 18);
      context.strokeStyle = "rgba(239, 197, 106, 0.1)";
      strokeRoundedRect(context, modifierX, modifierY, modifierCardWidth, modifierCardHeight, 18);

      const modifierIcon = await loadCanvasSafeImage(exportModifierIcons[modifier.name] ?? modifierIcons[modifier.name]);
      if (modifierIcon) {
        context.save();
        addRoundedRectPath(context, modifierX + 16, modifierY + ((modifierCardHeight - modifierIconSize) / 2), modifierIconSize, modifierIconSize, 6);
        context.clip();
        context.drawImage(modifierIcon, modifierX + 16, modifierY + ((modifierCardHeight - modifierIconSize) / 2), modifierIconSize, modifierIconSize);
        context.restore();
      } else {
        context.fillStyle = modifier.type === "good" ? "#91ef49" : "#ff6767";
        context.beginPath();
        context.arc(modifierX + 28, modifierY + (modifierCardHeight / 2), 8, 0, Math.PI * 2);
        context.fill();
      }

      context.fillStyle = modifier.type === "good" ? "#91ef49" : "#ff6767";
      context.font = `700 ${fitText(context, modifier.name, modifierTextWidth, modifierFontSize)}px Cinzel`;
      drawWrappedText(
        context,
        modifier.name,
        modifierX + 16 + modifierIconSize + 14,
        modifierY + (modifierColumns === 3 ? 21 : 24),
        modifierTextWidth,
        modifierColumns === 3 ? 14 : 16,
        modifier.type === "good" ? "#91ef49" : "#ff6767"
      );
    }

    const fileName = `rsts2-${currentRun.seed}.png`;
    const triggerDownload = (href) => {
      const link = document.createElement("a");
      link.href = href;
      link.download = fileName;
      document.body.append(link);
      link.click();
      link.remove();
    };

    if (canvas.toBlob) {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) {
        throw new Error("PNG export failed");
      }
      let copiedToClipboard = false;

      if (window.ClipboardItem && navigator.clipboard?.write) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          copiedToClipboard = true;
        } catch {}
      }

      if (copiedToClipboard) {
        exportImageBtn.textContent = "Copied Image";
      } else {
        const objectUrl = URL.createObjectURL(blob);
        triggerDownload(objectUrl);
        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
        exportImageBtn.textContent = "Downloaded";
      }
    } else {
      triggerDownload(canvas.toDataURL("image/png"));
      exportImageBtn.textContent = "Downloaded";
    }
  } catch {
    exportImageBtn.textContent = "Export Failed";
  }

  window.setTimeout(() => {
    exportImageBtn.disabled = !currentRun;
    exportImageBtn.textContent = "Export Image";
  }, 1200);
}

randomizeBtn.addEventListener("click", () => {
  const run = generateRun();
  revealRun(run);
});

exportImageBtn.addEventListener("click", exportRunImage);
customizeBtn.addEventListener("click", openCustomizationModal);
closeCustomizeBtn.addEventListener("click", closeCustomizationModal);
savePresetBtn.addEventListener("click", savePreset);
loadPresetBtn.addEventListener("click", loadPreset);
deletePresetBtn.addEventListener("click", deletePreset);
presetSelect.addEventListener("change", () => {
  const preset = state.presets.find((entry) => entry.name === presetSelect.value);
  presetNameInput.value = preset?.name ?? "";
  setPresetStatus("");
});
presetNameInput.addEventListener("input", () => setPresetStatus(""));

customizeModal.addEventListener("click", (event) => {
  if (event.target.dataset.closeModal === "true") {
    closeCustomizationModal();
  }
});

customizeModal.addEventListener("change", (event) => {
  if (event.target.matches("[data-filter-group]")) {
    updateCustomizationValidation();
  }
});

document.querySelectorAll("[data-group-action]").forEach((button) => {
  button.addEventListener("click", () => {
    setGroupSelection(button.dataset.groupAction, button.dataset.action === "all");
    updateCustomizationValidation();
  });
});

applyCustomizeBtn.addEventListener("click", () => {
  const draft = collectCustomizationDraft();
  const issues = validateCustomizationDraft(draft);

  if (issues.length > 0) {
    updateCustomizationValidation();
    return;
  }

  state.customization.ascensions = draft.ascensions;
  state.customization.characters = draft.characters;
  state.customization.modifiers = draft.modifiers;
  buildRosterPreview();
  getRequestedModifierCount();
  saveLocalState();
  closeCustomizationModal();
});

playerCountInput.addEventListener("change", () => {
  getPlayerCountValue();
  renderPlayerNameFields();
  saveLocalState();
});

modifierCountInput.addEventListener("change", saveLocalState);
seedInput.addEventListener("input", saveLocalState);

playerNameFields.addEventListener("input", (event) => {
  if (!event.target.matches("[data-player-name]")) {
    return;
  }

  const index = Number.parseInt(event.target.dataset.playerName, 10);
  state.playerNames[index] = event.target.value;
  const label = event.target.closest(".player-name-field")?.querySelector("span");
  if (label) {
    label.textContent = getDisplayPlayerName(index);
  }
  saveLocalState();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !customizeModal.hidden) {
    closeCustomizationModal();
  }
});

initializeFromLocalState();
