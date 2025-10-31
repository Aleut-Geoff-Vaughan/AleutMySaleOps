const fs = require('fs');

// Read the converted opportunities
const opportunities = JSON.parse(fs.readFileSync('opportunities_converted.json', 'utf8'));

// Read the React component file
const reactFile = fs.readFileSync('src/mySalesOps.jsx', 'utf8');

// Find the opportunities array and replace it
const opportunitiesString = JSON.stringify(opportunities, null, 2).split('\n').map((line, idx) => {
  if (idx === 0) return line; // Don't indent the opening bracket
  return '    ' + line; // Indent with 4 spaces for other lines
}).join('\n');

// Match the pattern from const [opportunities, setOpportunities] = useState([ to ]);
const regex = /(const \[opportunities, setOpportunities\] = useState\(\[)[^]*?(\n  \]\);)/;

const replacement = `$1\n${opportunitiesString}\n  $2`;

const updatedFile = reactFile.replace(regex, replacement);

// Write the updated file
fs.writeFileSync('src/mySalesOps.jsx', updatedFile);

console.log('Successfully updated mySalesOps.jsx with 50 opportunities from Salesforce!');
console.log(`Total opportunities loaded: ${opportunities.length}`);
