import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  afterAll(async () => {
    return client.end();
  });

  describe('/api/sneks', () => {
    let user;

    beforeAll(async () => {
      execSync('npm run recreate-tables');

      const response = await request
        .post('/api/auth/signup')
        .send({
          name: 'Me the User',
          email: 'me@user.com',
          passwordHash: 'password'
        });
      expect(response.status).toBe(200);


      user = response.body;
    });


    //const expectedSneks = [

    let sweaterNoodle = {
      id: expect.any(Number),
      name: 'Sweater Noodle',
      type: 'Boop Rope',
      url: '',
      species: 'ball python',
      accessory: 'sweater',
      isDeadlyWithTheVenom: false
    };

    // let topHatCober = {
    //   id: expect.any(Number),
    //   name: 'Top Hat Cober',
    //   type: 'Danger Noodle',
    //   url: '',
    //   species: 'cobra',
    //   accessory: 'top hat',
    //   isDeadlyWithTheVenom: true
    // },

    let bladeSlither = {
      id: expect.any(Number),
      name: 'Blade Slither',
      type: 'Danger Noodle',
      url: '',
      species: 'unknown',
      accessory: 'dual-wield short sword',
      isDeadlyWithTheVenom: true
    };

    let patricia = {
      id: expect.any(Number),
      name: 'Patricia',
      type: 'Boop Rope',
      url: '',
      species: 'ball python',
      accessory: 'jeweled necklace',
      isDeadlyWithTheVenom: false
    };
    //{
    // id: expect.any(Number),
    // name: 'Blade Slither',
    // type: 'Danger Noodle',
    // url: '',
    // species: 'unknown',
    // accessory: 'dual-wield short sword',
    // isDeadlyWithTheVenom: true
    // },
    // let hogball = {
    //   id: expect.any(Number),
    //   name: 'Hogball',
    //   type: 'Boop Rope',
    //   url: '',
    //   species: 'hognose',
    //   accessory: 'being adorable',
    //   isDeadlyWithTheVenom: false
    //},
    // let pokeNoodle = {
    //   id: expect.any(Number),
    //   name: 'PokeNoodle ',
    //   type: 'Danger Noodle',
    //   url: '',
    //   species: 'cobra',
    //   accessory: 'poke-esk card',
    //   isDeadlyWithTheVenom: true
    // },
    // let giffee = {
    //   id: expect.any(Number),
    //   name: 'Giffee',
    //   type: 'Boop Rope',
    //   url: '',
    //   species: 'ball python',
    //   accessory: 'giraffe headband',
    //   isDeadlyWithTheVenom: false
    // }


    // If a GET request is made to /api/cats, does:
    // 1) the server respond with status of 200
    // 2) the body match the expected API data?

    it('POST sweater noodle to /api/sneks', async () => {
      sweaterNoodle.userId = user.id;
      const response = await request
        .post('/api/sneks')
        .send(sweaterNoodle);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(sweaterNoodle);

      sweaterNoodle = response.body;
    });


    //expect(response.status).toBe(200);


    it.skip('GET /api/sneks', async () => {
      // act - make the request
      const res1 = await request.post('/api/sneks').send(bladeSlither);
      bladeSlither = res1.body;
      const res2 = await request.post('/api/sneks').send(patricia);
      patricia = res2.body;
      const response = await request.get('/api/sneks/');

      // was response OK (200)?
      expect(response.status).toBe(200);

      // did it return the data we expected?
      expect(response.body).toEqual([sweaterNoodle, bladeSlither, patricia]);

    });

    // // If a GET request is made to /api/cats/:id, does:
    // // 1) the server respond with status of 200
    // // 2) the body match the expected API data for the cat with that id?
    // it.skip('GET /api/sneks/:id', async () => {
    //   const response = await request.get('/api/sneks/2');
    //   expect(response.status).toBe(200);
    //   expect(response.body).toEqual(expectedSneks[1]);
  });
});

