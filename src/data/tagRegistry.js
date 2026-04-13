import { skills } from "./skills";
import { companies } from "./experience";
import { schools } from "./education";

/**
 * Normalize skills
 */
const normalizedSkills = skills.map((item) => ({
  ...item,
  __source: "skill",
  type: item.type || "framework", // fallback if you ever forget
}));

/**
 * Normalize companies (experience)
 */
const normalizedCompanies = companies.map((item) => ({
  ...item,
  __source: "experience",
  type: "experience",
}));

/**
 * Normalize schools (education)
 */
const normalizedSchools = schools.map((item) => ({
  ...item,
  __source: "education",
  type: "education",
}));

/**
 * Merge everything into one list
 */
const allEntries = [
  ...normalizedSkills,
  ...normalizedCompanies,
  ...normalizedSchools,
];

/**
 * Create fast lookup map:
 * id -> full object
 */
export const tagMap = Object.fromEntries(
  allEntries.map((entry) => [entry.id, entry])
);