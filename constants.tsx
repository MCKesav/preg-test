
import React from 'react';
import { Baby, Heart, Utensils, Users, ClipboardList, ShieldAlert, Activity } from 'lucide-react';
import { UserRole, BabyDevelopment } from './types';

// Fallback if AI generation fails
export const PREGNANCY_SPRITE_URL = "https://img.freepik.com/free-vector/pregnancy-stages-collection_23-2148118029.jpg";

export const NAV_ITEMS = [
  { id: UserRole.MOTHER, label: 'Mother', icon: <Activity className="w-5 h-5" /> },
  { id: UserRole.PARTNER, label: 'Partner', icon: <Heart className="w-5 h-5" /> },
  { id: UserRole.FAMILY, label: 'Family', icon: <Users className="w-5 h-5" /> },
  { id: UserRole.DOCTOR, label: 'Medical', icon: <ClipboardList className="w-5 h-5" /> },
];

export const BABY_DATA: Record<number, BabyDevelopment> = {
  12: {
    week: 12,
    size: 'Lime',
    weight: '14g',
    milestone: 'Reflexes are developing. The baby can curl toes and make sucking motions.',
    image: 'https://images.unsplash.com/photo-1555212627-d1b13022c47d?auto=format&fit=crop&q=80&w=400'
  },
  24: {
    week: 24,
    size: 'Ear of Corn',
    weight: '600g',
    milestone: 'Lungs are forming "branches". The baby is becoming viable.',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400'
  },
  32: {
    week: 32,
    size: 'Squash',
    weight: '1.7kg',
    milestone: 'Practicing breathing. Toenails are visible.',
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&q=80&w=400'
  }
};

export const PREGNANCY_JOURNEY_DATA = [
  {
    month: 1,
    title: "Month 1 – Early Development",
    highlights: "Your baby is beginning to form vital organs like the heart and lungs. The embryo is poppy seed size.",
    symptoms: "Hormonal changes may cause nausea and fatigue.",
    tips: "Rest and proper nutrition are important. Start Folic Acid.",
    visualPrompt: "small C-shaped embryo, very early stage, heart and neural tube forming",
    staticImage: "https://uploads.onecompiler.io/449hhnqm6/449hhnyef/IMG-20260103-WA0021.jpg"
  },
  {
    month: 2,
    title: "Month 2 – The Heart Beat",
    highlights: "The heart begins to beat. Limb buds, fingers, and toes start developing as the tail disappears.",
    symptoms: "Continued morning sickness and frequent urination.",
    tips: "Eat small, frequent meals to settle your stomach.",
    visualPrompt: "fetus with visible limb buds, developing facial features, slightly larger than month 1"
  },
  {
    month: 3,
    title: "Month 3 – Becoming a Fetus",
    highlights: "Movement begins. All organs are present, and the head is about 50% of the body length.",
    symptoms: "Mood swings are common. You may notice a small 'bump'.",
    tips: "Transition to comfortable maternity clothing.",
    visualPrompt: "fully formed human fetus, fingers and toes defined, large head compared to body"
  },
  {
    month: 4,
    title: "Month 4 – Second Trimester",
    highlights: "The baby can now swallow. Skeletal structure is visible and floating freely.",
    symptoms: "Energy often returns. 'The mask of pregnancy' may appear.",
    tips: "Stay moisturized as your skin begins to stretch.",
    visualPrompt: "fetus moving freely, skeleton beginning to harden, skin is thin and transparent"
  },
  {
    month: 5,
    title: "Month 5 – Hello Movements",
    highlights: "You’ll likely feel first kicks. Hearing develops and fine hair (lanugo) begins.",
    symptoms: "Backaches and leg cramps may occur.",
    tips: "Practice gentle prenatal yoga for back support.",
    visualPrompt: "fetus with fine hair, sucking thumb, active movement in the uterus"
  },
  {
    month: 6,
    title: "Month 6 – Eye Development",
    highlights: "Baby's eyes can open and blink. Lungs continue maturing. Posture becomes curled.",
    symptoms: "Increased appetite and occasional heartburn.",
    tips: "Try side-sleeping with a pregnancy pillow.",
    visualPrompt: "fetus with eyes beginning to open, wrinkled skin, lungs developing branches"
  },
  {
    month: 7,
    title: "Month 7 – Rapid Brain Growth",
    highlights: "Brain development is fast. Baby practices breathing and gains fat deposits.",
    symptoms: "Feeling heavy; Braxton Hicks contractions may start.",
    tips: "Attend prenatal classes and finalize birth plans.",
    visualPrompt: "larger fetus, rhythmic breathing movements, responding to light and sound"
  },
  {
    month: 8,
    title: "Month 8 – Head-Down Position",
    highlights: "Baby gains weight quickly. Space is tight, and movement feels like pokes.",
    symptoms: "Shortness of breath as baby nears the ribs.",
    tips: "Pack your hospital bag and finish the nursery.",
    visualPrompt: "fully developed fetus in head-down position, cramped space in uterus"
  },
  {
    month: 9,
    title: "Month 9 – Ready for Birth",
    highlights: "Lungs are mature. Baby drops into the pelvis (engagement) for birth.",
    symptoms: "Increased pelvic pressure and nesting instinct.",
    tips: "Rest as much as possible and enjoy the final days.",
    visualPrompt: "mature newborn-sized baby, engaged in pelvis, ready for birth"
  }
];

export const MOCK_VITALS = [
  { time: 'Mon', sugar: 95, bp: 110, hr: 72, stress: 35, spO2: 98, weight: 63.8, sleepRem: 1.2, sleepCore: 4.5, sleepDeep: 1.8, snoring: 12 },
  { time: 'Tue', sugar: 125, bp: 115, hr: 78, stress: 55, spO2: 97, weight: 64.0, sleepRem: 1.0, sleepCore: 4.0, sleepDeep: 2.1, snoring: 8 },
  { time: 'Wed', sugar: 110, bp: 120, hr: 75, stress: 40, spO2: 98, weight: 64.1, sleepRem: 1.4, sleepCore: 4.8, sleepDeep: 1.5, snoring: 25 },
  { time: 'Thu', sugar: 105, bp: 118, hr: 73, stress: 32, spO2: 99, weight: 64.2, sleepRem: 1.1, sleepCore: 4.2, sleepDeep: 2.0, snoring: 15 },
  { time: 'Fri', sugar: 115, bp: 112, hr: 70, stress: 38, spO2: 98, weight: 64.3, sleepRem: 1.3, sleepCore: 4.6, sleepDeep: 1.7, snoring: 10 },
  { time: 'Sat', sugar: 108, bp: 114, hr: 74, stress: 45, spO2: 97, weight: 64.5, sleepRem: 1.5, sleepCore: 5.2, sleepDeep: 1.2, snoring: 5 },
  { time: 'Sun', sugar: 102, bp: 110, hr: 72, stress: 30, spO2: 98, weight: 64.4, sleepRem: 1.2, sleepCore: 4.5, sleepDeep: 2.2, snoring: 30 },
];

export const MOCK_WEIGHT_HISTORY = [
  { week: 'Wk 20', weight: 61.2 },
  { week: 'Wk 21', weight: 61.8 },
  { week: 'Wk 22', weight: 62.5 },
  { week: 'Wk 23', weight: 63.4 },
  { week: 'Wk 24', weight: 64.2 },
];

export const MOCK_TASKS = [
  { id: '1', title: 'Buy iron supplements', completed: false, assignedTo: UserRole.PARTNER, dueDate: 'Today' },
  { id: '2', title: 'Schedule 24-week scan', completed: true, assignedTo: UserRole.MOTHER, dueDate: 'Done' },
  { id: '3', title: 'Install car seat', completed: false, assignedTo: UserRole.PARTNER, dueDate: 'Next Week' },
  { id: '4', title: 'Update Family on last checkup', completed: false, assignedTo: UserRole.MOTHER, dueDate: 'Today' },
];
