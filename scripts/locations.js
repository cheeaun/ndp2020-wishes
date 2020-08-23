const got = require('got');
const fs = require('fs');

got('https://ndp2020.life.gov.sg/ndp-campaign/api/v1/messages/locations', {
  responseType: 'json',
}).then(({ body }) => {
  console.log(body.data.length + ' wishes');
  fs.writeFileSync(
    'data/locations.json',
    JSON.stringify(body.data, null, '\t'),
  );
});
