import express from 'express'
import bodyParser from 'body-parser'
import request from 'request'

const app: express.Application = express()
const PORT: number = 3000

app.use(bodyParser.urlencoded({ extended: false }))

app.listen(PORT, () => {
  console.log(`Airbnbot listening on port ${PORT}!`)
})

app.get('/', (req, res) => {
  res.send(`Ngrok is working! Path Hit: ${req.url}`)
})

app.get('/oauth', (req, res) => {
  if (!req.query.code) {
    res.status(500)
    res.send({ Error: "Looks like we're not getting code." })
    console.log("Looks like we're not getting code.")
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
          console.log(error)
        } else {
          res.json(body)
        }
      }
    )
  }
})

const dateRegex: RegExp = /\d{4}-\d{2}-\d{2}/g

app.post('/london', (req, res) => {
  const dates: string[] = req.body.text.match(dateRegex)
  request.get(
    'https://www.airbnb.com/api/v2/explore_tabs?' +
      'items_per_grid=18' +
      '&timezone_offset=60' +
      `&client_session_id=${process.env.AIRBNB_CLIENT_SESSION_ID}` +
      `&checkin=${dates[0]}` +
      `&checkout=${dates[1]}` +
      '&adults=2' +
      '&children=0' +
      '&infants=0' +
      '&guests=2' +
      '&room_types%5B%5D=Entire%20home%2Fapt' +
      '&query=Londres%2C%20Royaume-Uni' +
      '&_intents=p1' +
      `&key=${process.env.AIRBNB_KEY}` +
      '&currency=EUR' +
      '&locale=fr',
    (error, response, body) => {
      if (error) {
        console.log(error)
      } else {
        res.json(body)
      }
    }
  )
})
