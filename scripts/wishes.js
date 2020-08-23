const got = require('got');
const fs = require('fs');

const locations = require('../data/locations.json');

const ids = locations.map((l) => l.key);
console.log(`Requesting ${ids.length} wishes`);

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size),
  );

const idsChunks = chunk(ids, 500);

const wishes = [];
(async () => {
  for (let i = 0, l = idsChunks.length; i < l; i++) {
    const ids = idsChunks[i];
    await got
      .post('https://ndp2020.life.gov.sg/ndp-campaign/api/v1/messages', {
        responseType: 'json',
        json: { id: ids },
      })
      .then(({ body }) => {
        console.log(body.data.length + ' wishes');
        wishes.push(...body.data);
      });
  }

  console.log(wishes.length + ' total wishes');

  fs.writeFileSync('data/wishes.json', JSON.stringify(wishes, null, '\t'));
})();
