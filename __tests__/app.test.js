import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  beforeAll(() => {
    execSync('npm run setup-db');
  });

  afterAll(async () => {
    return client.end();
  });

  const expectedSneks = [
    {
      id: expect.any(Number),
      name: 'Sweater Noodle',
      type: 'Boop Rope',
      url: '',
      species: 'ball python',
      accessory: 'sweater',
      isDeadlyWithTheVenom: false
    },
    {
      id: expect.any(Number),
      name: 'Top Hat Cober',
      type: 'Danger Noodle',
      url: '',
      species: 'cobra',
      accessory: 'top hat',
      isDeadlyWithTheVenom: true
    },
    {
      id: expect.any(Number),
      name: 'Blade Slither',
      type: 'Danger Noodle',
      url: '',
      species: 'unknown',
      accessory: 'dual-wield short sword',
      isDeadlyWithTheVenom: true
    },
    {
      id: expect.any(Number),
      name: 'Patricia',
      type: 'Boop Rope',
      url: '',
      species: 'ball python',
      accessory: 'jeweled necklace',
      isDeadlyWithTheVenom: false
    },
    {
      id: expect.any(Number),
      name: 'Blade Slither',
      type: 'Danger Noodle',
      url: '',
      species: 'unknown',
      accessory: 'dual-wield short sword',
      isDeadlyWithTheVenom: true
    },
    {
      id: expect.any(Number),
      name: 'Hogball',
      type: 'Boop Rope',
      url: '',
      species: 'hognose',
      accessory: 'being adorable',
      isDeadlyWithTheVenom: false
    },
    {
      id: expect.any(Number),
      name: 'PokeNoodle ',
      type: 'Danger Noodle',
      url: '',
      species: 'cobra',
      accessory: 'poke-esk card',
      isDeadlyWithTheVenom: true
    },
    {
      id: expect.any(Number),
      name: 'Giffee',
      type: 'Boop Rope',
      url: '',
      species: 'ball python',
      accessory: 'giraffe headband',
      isDeadlyWithTheVenom: false
    }
  ];

  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  it('GET /api/sneks', async () => {
    // act - make the request
    const response = await request.get('/api/sneks');

    // was response OK (200)?
    expect(response.status).toBe(200);

    // did it return the data we expected?
    expect(response.body).toEqual(expectedSneks);

  });

  // If a GET request is made to /api/cats/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  test('GET /api/sneks/:id', async () => {
    const response = await request.get('/api/sneks/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedSneks[1]);
  });
});