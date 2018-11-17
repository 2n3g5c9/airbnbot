import * as messages from '../src/messages'

test('generation of the help message', () => {
  expect(messages.helpAttachment('city', 'Some test help message.')).toEqual({
    response_type: 'ephemeral',
    text: 'How to use `/city`:',
    attachments: [
      {
        color: '#764FA5',
        text: 'Some test help message.',
      },
    ],
  })
})

test('generation of an error message', () => {
  const message: {
    color: string
    pretext: string
    text: string
    footer: string
    footer_icon: string | undefined
    ts: number
  } = messages.errorAttachment('Some test error message.').attachments[0]
  delete message.footer_icon
  delete message.ts
  expect(message).toEqual({
    color: 'danger',
    pretext: 'An error occured with Airbnbot:',
    text: 'Some test error message.',
    footer: 'Airbnbot',
  })
})

test('generation of a waiting message', () => {
  const message: {
    color: string
    pretext: string
    text: string
    footer: string
    footer_icon: string | undefined
    ts: number
  } = messages.waitingAttachment('Some test waiting message.').attachments[0]
  delete message.footer_icon
  delete message.ts
  expect(message).toEqual({
    color: 'warning',
    pretext: 'Your request has been received:',
    text: 'Some test waiting message.',
    footer: 'Airbnbot',
  })
})

test('generation of homes attachments', () => {
  const listings: any = [
    {
      listing: {
        id: '123456',
        badges: ['PERLE RARE'],
        name: 'The super rare appartment',
        city: 'London',
        neighborhood: 'Famous neighborhood',
        picture: {
          picture: 'https://airbnb.com/',
        },
      },
      pricing_quote: {
        price_string: '100€',
        price: {
          total: {
            amount: 300,
            amount_formatted: '300€',
          },
        },
      },
    },
    {
      listing: {
        id: '123457',
        badges: ['PERLE RARE'],
        name: 'The super super rare appartment',
        city: 'London',
        picture: {
          picture: 'https://airbnb.com/',
        },
      },
      pricing_quote: {
        price_string: '50€',
        price: {
          total: {
            amount: 150,
            amount_formatted: '150€',
          },
        },
      },
    },
    {
      listing: {
        id: '123458',
        badges: [],
        name: 'The not so rare appartment',
        city: 'London',
        neighborhood: 'Infamous neighborhood',
        picture: {
          picture: 'https://airbnb.com/',
        },
      },
      pricing_quote: {
        price_string: '150€',
        price: {
          total: {
            amount: 450,
            amount_formatted: '450€',
          },
        },
      },
    },
  ]
  const dates: string[] = ['2018-12-28', '2018-12-31']
  // Testing when there are 'PERLE RARE'
  expect(messages.homesAttachments(listings, dates)).toEqual({
    attachments: [
      {
        color: 'good',
        title: 'The super super rare appartment :gem:',
        title_link:
          'https://www.airbnb.fr/rooms/123457?adults=2&children=0&infants=0&guests=2&toddlers=0&check_in=2018-12-28&check_out=2018-12-31',
        text: '_London_',
        thumb_url: 'https://airbnb.com/',
        fields: [
          {
            title: 'Price per night',
            value: '50€',
            short: true,
          },
          {
            title: 'Price in total',
            value: '150€',
            short: true,
          },
        ],
      },
      {
        color: 'good',
        title: 'The super rare appartment :gem:',
        title_link:
          'https://www.airbnb.fr/rooms/123456?adults=2&children=0&infants=0&guests=2&toddlers=0&check_in=2018-12-28&check_out=2018-12-31',
        text: '_Famous neighborhood, London_',
        thumb_url: 'https://airbnb.com/',
        fields: [
          {
            title: 'Price per night',
            value: '100€',
            short: true,
          },
          {
            title: 'Price in total',
            value: '300€',
            short: true,
          },
        ],
      },
    ],
  }),
    // Testing where there are no 'PERLE RARE'
    expect(
      messages.homesAttachments(
        listings.filter((listing: any) => {
          return !listing.listing.badges.includes('PERLE RARE')
        }),
        dates
      )
    ).toEqual({
      attachments: [
        {
          color: 'good',
          title: 'The not so rare appartment',
          title_link:
            'https://www.airbnb.fr/rooms/123458?adults=2&children=0&infants=0&guests=2&toddlers=0&check_in=2018-12-28&check_out=2018-12-31',
          text: '_Infamous neighborhood, London_',
          thumb_url: 'https://airbnb.com/',
          fields: [
            {
              title: 'Price per night',
              value: '150€',
              short: true,
            },
            {
              title: 'Price in total',
              value: '450€',
              short: true,
            },
          ],
        },
      ],
    })
})
