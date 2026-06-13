const thinkingDurationMax = 4200;
const thinkingDurationMin = 2700;
const thinkingDurationRange = thinkingDurationMax - thinkingDurationMin + 1
export const getThinkingDuration = () => Math.floor(Math.random() * thinkingDurationRange) + thinkingDurationMin;

const thinkingIntervalDurationMax = 1200;
const thinkingIntervalDurationMin = 700;
const thinkingIntervalDurationRange = thinkingIntervalDurationMax - thinkingIntervalDurationMin + 1;
export const getThinkingIntervalDuration = () => Math.floor(Math.random() * thinkingIntervalDurationRange) + thinkingIntervalDurationMin;

export const promptUpgradeAfter = 2;

export const thinkingTasks = [
    "Unlocking magnitude...",
    "Democratizing scale...",
    "Empowering quantities...",
    "Activating abundance...",
    "Future-proofing numbers...",
    "Optimizing largeness...",
    "Accelerating growth...",
    "Enhancing scalability...",
    "Maximizing value...",
    "Delivering magnitude...",
    "Verticalizing outcomes...",
    "Scaling innovation...",
    "Expanding total addressable magnitude...",
    "Moving the needle...",
    "Transforming measurement...",
    "Reducing unit costs...",
    "Accelerating scale adoption...",
    "Building measurement capacity...",
    "Unlocking growth vectors...",
    "Moving up the value chain...",
];
