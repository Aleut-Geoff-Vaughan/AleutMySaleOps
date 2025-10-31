const XLSX = require('xlsx');
const fs = require('fs');

// Read the Excel file
const workbook = XLSX.readFile('Opportunity.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

console.log('Total opportunities found:', data.length);
console.log('\nFirst opportunity structure:');
console.log(JSON.stringify(data[0], null, 2));

console.log('\nAll column names:');
console.log(Object.keys(data[0]).join('\n'));

// Save full data to file for inspection
fs.writeFileSync('opportunities_raw.json', JSON.stringify(data, null, 2));
console.log('\nFull data saved to opportunities_raw.json');
