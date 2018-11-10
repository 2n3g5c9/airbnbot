import express from 'express';
import request from 'request';

const app: express.Application = express();
const PORT: number = 3000;

app.listen(PORT, () => {
  console.log(`Airbnbot listening on port ${PORT}!`);
});

app.get('/', (req, res) => {
  res.send(`Ngrok is working! Path Hit: ${req.url}`);
});

app.get('/oauth', (req, res) => {
  if (!req.query.code) {
    res.status(500);
    res.send({ Error: "Looks like we're not getting code." });
    console.log("Looks like we're not getting code.");
  } else {
    request(
      {
        url: 'https://slack.com/api/oauth.access',
        qs: {
          code: req.query.code,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
        method: 'GET',
      },
      (error, response, body) => {
        if (error) {
          console.log(error);
        } else {
          res.json(body);
        }
      },
    );
  }
});

app.post('/london', (req, res) => {
  res.send('Our ngrok tunnel is up and running!');
});
