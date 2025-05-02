import { write } from "bun";

const text =
  '```json\n{\n  "match": 85,\n  "missingSkills": [\n    "Node.js",\n    "PHP",\n    "Relational Databases",\n    "Non-Relational Databases",\n    "Git",\n    "Automated Testing",\n    "Agile Methodologies"\n  ],\n  "summary": "The candidate demonstrates a strong fit for the job description, particularly in frontend development with React and TypeScript. Their project and work experience align well with the required skills. The candidate would benefit from experience with backend technologies like Node.js or PHP, databases, version control systems like Git, automated testing, and agile methodologies."\n}\n```';

// Strip Markdown code block and parse JSON
const cleanText = text.replace(/^```json\n/, "").replace(/\n```$/, "");
const json = JSON.parse(cleanText);

write("res.json", JSON.stringify(json, null, 2));
