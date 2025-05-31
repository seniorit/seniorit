// scripts/update-tech-table.js
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const currentYear = new Date().getFullYear();

const data = yaml.load(fs.readFileSync(path.join(__dirname, '../.github/data/tech-experience.yaml'), 'utf8'));

function generateTable(data, title) {
  let table = `| Rank | ${title} | Age |\n|-----:|--------------------------------------|-----|\n`;
  data.forEach((item, index) => {
    const age = currentYear - item.since;
    table += `| ${String(index + 1).padStart(3)} | ${item.name.padEnd(36)} | ${age.toString().padStart(3)} |\n`;
  });
  return table;
}

const languagesTable = generateTable(data.languages, 'Languages / Technologies');
const databasesTable = generateTable(data.databases, 'DATABASE MANAGEMENT SYSTEMS');

const readmeContent = `
## 🛠️ Años de Experiencia

${languagesTable}

${databasesTable}
`;

fs.writeFileSync(path.join(__dirname, '../README.md'), readmeContent);

console.log("✅ Tabla generada correctamente.");
