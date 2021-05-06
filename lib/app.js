/* eslint-disable no-console */
// import dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import client from './client.js';

// make an express app
const app = express();

// allow our server to be called from any website
app.use(cors());
// read JSON from body of request when indicated by Content-Type
app.use(express.json());
// enhanced logging
app.use(morgan('dev'));

// heartbeat route
app.get('/', (req, res) => {
  res.send('Sneks API');
});

// API routes,
app.get('/api/sneks', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  id,
      name,
      type,
      url,
      species,
      accessory,
      is_deadly_with_the_venom as "isDeadlyWithTheVenom"
      FROM sneks;
    `);

    // send back the data
    res.json(data.rows);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/sneks/:id', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  id,
      name,
      type,
      url,
      species,
      accessory,
      is_deadly_with_the_venom as "isDeadlyWithTheVenom"
      FROM    sneks
      WHERE   id = $1;
    `, [req.params.id]);

    // send back the data
    res.json(data.rows[0] || null);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sneks', async (req, res) => {

  try {
    const snek = req.body;
    const data = await client.query(`
    INSERT INTO sneks(name, type, url, species, accessory, is_deadly_with_the_venom)
    
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING id, name, type, url, species, accessory, is_deadly_with_the_venom as 'isDeadlyWithTheVenom'; 
    `, [
      snek.name, snek.type, snek.url, snek.species, snek.accessory, snek.isDeadlyWithTheVenom
    ]);
    res.json(data.rows[0]);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }

});

export default app;