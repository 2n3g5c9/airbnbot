/**
 * @description wrapper for writing error attachments
 * @param text text to show the user when an error occurs with Airbnbot
 * @returns an attachments list following Slack's guidelines
 */
export const helpAttachment = (commandName: string, text: string) => {
  return {
    response_type: 'ephemeral',
    text: `How to use \`/${commandName}\`:`,
    attachments: [
      {
        color: '#764FA5',
        text: text,
      },
    ],
  }
}

/**
 * @description wrapper for writing error attachments
 * @param text text to show the user when an error occurs with Airbnbot
 * @returns an attachments list following Slack's guidelines
 */
export const errorAttachment = (text: string) => {
  return {
    attachments: [
      {
        color: 'danger',
        pretext: 'An error occured with Airbnbot:',
        text: text,
        footer: 'Airbnbot',
        footer_icon: process.env.AIRBNBOT_ICON_URL,
        ts: new Date().getTime() / 1000,
      },
    ],
  }
}

/**
 * @description wrapper for writing waiting attachments
 * @param text text to show the user when something takes a long time for Airbnbot
 * @returns an attachments list following Slack's guidelines
 */
export const waitingAttachment = (text: string) => {
  return {
    attachments: [
      {
        color: 'warning',
        pretext: 'Your request has been received:',
        text: text,
        footer: 'Airbnbot',
        footer_icon: process.env.AIRBNBOT_ICON_URL,
        ts: new Date().getTime() / 1000,
      },
    ],
  }
}

/**
 * @description turns a listing into an attachment to display on Slack
 * @param listing item of Airbnb's API's listings
 * @param dates array of checkin date and checkout date
 * @returns an item for attachments
 */
const fromListingToAttachment = (listing: any, dates: string[]) => {
  return {
    color: 'good',
    title: listing.listing.badges.includes('PERLE RARE')
      ? `${listing.listing.name} :gem:`
      : `${listing.listing.name}`,
    title_link: `https://www.airbnb.fr/rooms/${
      listing.listing.id
    }?adults=2&children=0&infants=0&guests=2&toddlers=0&check_in=${
      dates[0]
    }&check_out=${dates[1]}`,
    text: listing.listing.neighborhood
      ? `_${listing.listing.neighborhood}, ${listing.listing.city}_`
      : `_${listing.listing.city}_`,
    thumb_url: listing.listing.picture.picture,
    fields: [
      {
        title: 'Price per night',
        value: listing.pricing_quote.price_string,
        short: true,
      },
      {
        title: 'Price in total',
        value: listing.pricing_quote.price.total.amount_formatted,
        short: true,
      },
    ],
  }
}

/**
 * @description turns listings into attachments to display on Slack
 * @param listings Airbnb's API's listings
 * @param dates array of checkin date and checkout date
 * @returns an attachments list with TOP 5 rare homes available
 */
export const homesAttachments = (listings: any, dates: string[]) => {
  let homes: any = listings.filter((listing: any) => {
    return listing.listing.badges.includes('PERLE RARE')
  })

  // If there is no rare home, let's consider every homes
  if (homes.length === 0) {
    homes = listings
  }

  homes = homes
    .sort((a: any, b: any) => {
      return (
        a.pricing_quote.price.total.amount - b.pricing_quote.price.total.amount
      )
    })
    .slice(0, 5)

  return {
    attachments: homes.map((listing: any) =>
      fromListingToAttachment(listing, dates)
    ),
  }
}
