import * as messages from '../src/messages'

test('generation of the help message', () => {
  expect(messages.helpAttachment('Some test help message.')).toEqual({
    response_type: 'ephemeral',
    text: 'How to use `/london`:',
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
  } = messages.errorAttachment('Some test waiting message.').attachments[0]
  delete message.footer_icon
  delete message.ts
  expect(message).toEqual({
    color: 'danger',
    pretext: 'An error occured with Airbnbot:',
    text: 'Some test waiting message.',
    footer: 'Airbnbot',
  })
})
