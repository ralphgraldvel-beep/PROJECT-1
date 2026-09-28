/* =========================================================
   QUESTION BANK
   ---------------------------------------------------------
   SUBJECTS  = the list of subjects shown on the Home screen.
   QUESTIONS = every question in the app.

   How to add a question:
   1. Copy one whole { ... } block.
   2. Paste it after the last block. Keep a comma between blocks.
   3. Give it a new, unique "id".
   4. "answer" counts from 0:  0 = A,  1 = B,  2 = C,  3 = D.
   5. "explanation" can be "" if there is none yet.

   "sample: true" marks a placeholder question that will be
   replaced by the owner's real questions later.
   ========================================================= */

const SUBJECTS = [
  { id: "MGT-F1", level: "Management Level", name: "Function 1 – Navigation" },
  { id: "MGT-F2", level: "Management Level", name: "Function 2 – Cargo Handling & Stowage" },
  { id: "MGT-F3", level: "Management Level", name: "Function 3 – Controlling the Operation of the Ship & Care for Persons on Board" }
];

const QUESTIONS = [

  /* ---------- From the owner's mtestm screenshots ---------- */
  {
    id: "MGT-F3-0001",
    subject: "MGT-F3",
    question: "In a jacking system, what is referred to as a pinion?",
    choices: ["Gearwheel", "Flexible coupling", "Flexible shaft", "Flexible joint"],
    answer: 0,
    explanation: "The pinion is the small gearwheel that meshes with the rack (or a larger gear) to turn rotation into movement."
  },
  {
    id: "MGT-F3-0002",
    subject: "MGT-F3",
    question: "How does the control principle for achieving astern thrust on a CPP plant differ from an FPP plant?",
    choices: [
      "The CPP reverses the blade pitch; the FPP reverses the engine rotation.",
      "The CPP reverses the engine rotation; the FPP reverses the blade pitch.",
      "The CPP engages a clutch; the FPP increases the engine speed.",
      "The CPP increases the engine speed; the FPP engages a clutch."
    ],
    answer: 0,
    explanation: "A controllable-pitch propeller (CPP) keeps turning the same way; astern thrust comes from swinging the blades to reverse pitch. A fixed-pitch propeller (FPP) cannot change its blades, so the engine itself must be reversed."
  },
  {
    id: "MGT-F3-0003",
    subject: "MGT-F3",
    question: "What device protects a direct-sensing steam pressure gauge from steam damage?",
    choices: [
      "A siphon tube (pig-tail) oriented vertically at the gauge inlet.",
      "A siphon tube (pig-tail) oriented horizontally at the gauge inlet.",
      "Thermal insulation on the gauge.",
      "A damping needle valve at the gauge inlet."
    ],
    answer: 0,
    explanation: "The pig-tail siphon fills with condensed water, which forms a water seal so live steam never reaches the gauge's Bourdon tube."
  },

  /* ---------- SAMPLE questions (replace later) ---------- */
  {
    id: "MGT-F1-S001",
    subject: "MGT-F1",
    sample: true,
    question: "When two power-driven vessels are crossing so as to involve risk of collision, which vessel shall keep out of the way?",
    choices: [
      "The vessel which has the other on her own starboard side",
      "The vessel which has the other on her own port side",
      "The larger vessel",
      "The faster vessel"
    ],
    answer: 0,
    explanation: "COLREG Rule 15: the vessel which has the other on her own starboard side shall keep out of the way and, if possible, avoid crossing ahead of the other vessel."
  },
  {
    id: "MGT-F1-S002",
    subject: "MGT-F1",
    sample: true,
    question: "A vessel is deemed to be overtaking when coming up with another vessel from a direction more than how many degrees abaft her beam?",
    choices: ["10 degrees", "22.5 degrees", "45 degrees", "90 degrees"],
    answer: 1,
    explanation: "COLREG Rule 13(b): more than 22.5 degrees abaft the beam, so that at night only the sternlight would be visible."
  },
  {
    id: "MGT-F1-S003",
    subject: "MGT-F1",
    sample: true,
    question: "One international nautical mile is equal to:",
    choices: ["1,609 metres", "1,852 metres", "1,000 metres", "2,000 metres"],
    answer: 1,
    explanation: "The international nautical mile is exactly 1,852 metres, roughly one minute of latitude."
  },
  {
    id: "MGT-F1-S004",
    subject: "MGT-F1",
    sample: true,
    question: "Philippine waters use which IALA buoyage region?",
    choices: ["Region A", "Region B", "Region C", "Both A and B"],
    answer: 1,
    explanation: "IALA Region B (red to starboard when entering from seaward) is used in the Americas, Japan, Korea and the Philippines."
  },
  {
    id: "MGT-F2-S001",
    subject: "MGT-F2",
    sample: true,
    question: "The IMDG Code deals with the safe carriage by sea of:",
    choices: [
      "Dangerous goods in packaged form",
      "Solid bulk cargoes",
      "Grain in bulk",
      "Oil in bulk"
    ],
    answer: 0,
    explanation: "Solid bulk cargoes are covered by the IMSBC Code, grain by the International Grain Code and oil by MARPOL Annex I."
  },
  {
    id: "MGT-F2-S002",
    subject: "MGT-F2",
    sample: true,
    question: "What is the effect of free surface in a slack tank on a ship's stability?",
    choices: [
      "It reduces the effective GM (a virtual rise of G)",
      "It increases the GM",
      "It has no effect if the tank is small",
      "It lowers the centre of gravity"
    ],
    answer: 0,
    explanation: "Liquid moving in a slack tank acts as if the centre of gravity has risen (virtual rise of G), which reduces the effective metacentric height (GM)."
  },
  {
    id: "MGT-F2-S003",
    subject: "MGT-F2",
    sample: true,
    question: "Which flag-State-approved document on board sets out how cargo units such as containers must be stowed and secured?",
    choices: [
      "Cargo Securing Manual",
      "Stability Booklet",
      "Ship Security Plan",
      "Safety Management Manual"
    ],
    answer: 0,
    explanation: "SOLAS Chapters VI and VII require a Cargo Securing Manual, approved by the Administration, for ships carrying cargo units."
  },
  {
    id: "MGT-F3-S001",
    subject: "MGT-F3",
    sample: true,
    question: "Under SOLAS, every crew member must take part in at least one abandon-ship drill and one fire drill:",
    choices: ["Every week", "Every month", "Every three months", "Only before each voyage"],
    answer: 1,
    explanation: "SOLAS Chapter III, Regulation 19: every month. Drills must also be held within 24 hours of leaving port if more than 25% of the crew have not taken part in a drill on that ship in the previous month."
  },
  {
    id: "MGT-F3-S002",
    subject: "MGT-F3",
    sample: true,
    question: "In shipping, what does \"P&I\" stand for?",
    choices: [
      "Protection and Indemnity",
      "Property and Insurance",
      "Personal and Injury",
      "Protection and Insurance"
    ],
    answer: 0,
    explanation: "P&I Clubs are mutual associations of shipowners that provide Protection and Indemnity cover for third-party liabilities."
  },
  {
    id: "MGT-F3-S003",
    subject: "MGT-F3",
    sample: true,
    question: "Part I of the Oil Record Book is used to record:",
    choices: [
      "Machinery space operations",
      "Cargo and ballast operations on oil tankers",
      "Garbage disposal",
      "Sewage discharge"
    ],
    answer: 0,
    explanation: "MARPOL Annex I: Part I covers machinery space operations (all ships). Part II covers cargo/ballast operations on oil tankers of 150 GT and above."
  }

];
