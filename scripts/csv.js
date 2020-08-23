const fs = require('fs');
const Papa = require('papaparse');
const wishes = require('../data/wishes.json');

function round(num, precision = 5) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(num * multiplier) / multiplier;
}

let words = '';
const cleanedWishes = wishes.map((w) => {
  const content = w.content.trim();
  words += content + ' ';
  return {
    name: w.name.trim(),
    content,
    lng: round(w.lng),
    lat: round(w.lat),
  };
});

var csv = Papa.unparse(cleanedWishes, {
  columns: ['name', 'content', 'lng', 'lat'],
});

fs.writeFileSync('data/wishes.csv', csv);
fs.writeFileSync('data/words.txt', words.trim());
