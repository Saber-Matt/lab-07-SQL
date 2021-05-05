/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import sneks from './sneks.js';

run();

async function run() {

  try {

    await Promise.all(
      sneks.map(snek => {
        return client.query(`
          INSERT INTO sneks (name, type, url, species, accessory, is_deadly_with_the_venom)
          VALUES ($1, $2, $3, $4, $5, $6);
        `,
          [snek.name, snek.type, snek.url, snek.species, snek.accessory, snek.isDeadlyWithTheVenom]);
      })
    );


    console.log('seed data load complete');
  }
  catch (err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}