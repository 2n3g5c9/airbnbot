import express from 'express'
import morgan from 'morgan'
import request from 'request'
import * as messages from './messages'

const app: express.Application = express()
const PORT: number = 3000

app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))

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
  // Handling of the lost user
  if (req.body.text === 'help') {
    res.json(
      messages.helpAttachment(
        'Simply write something like: `/london 2018-12-25 2018-12-31`.'
      )
    )
  } else {
    // Immediate response to tell the user the backend is processing
    res.json(
      messages.waitingAttachment(
        'Fetching and filtering the results... :watch:'
      )
    )

    // Preparation for the delayed response
    let options: { uri: string; json: boolean; body: any } = {
      uri: req.body.response_url,
      json: true,
      body: {},
    }

    const dates: string[] = req.body.text.match(dateRegex)

    if (dates && dates.length === 2) {
      request.get(
        'https://www.airbnb.com/api/v2/explore_tabs?' +
          'items_per_grid=1800' +
          '&timezone_offset=60' +
          `&client_session_id=${process.env.AIRBNB_CLIENT_SESSION_ID}` +
          '&selected_tab_id=home_tab' +
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
            options.body = messages.errorAttachment(error)
          } else {
            try {
              options.body = messages.homesAttachments(
                JSON.parse(body).explore_tabs[0].sections[1].listings,
                dates
              )
            } catch (e) {
              options.body = messages.errorAttachment(
                "Airbnb doesn't want to serve the results... :cry: try again later."
              )
            }
            request.post(options)
          }
        }
      )
    }
  }
})
