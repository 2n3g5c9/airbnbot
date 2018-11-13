export const errorAttachment = (text: string) => {
  return {
    attachments: [
      {
        color: 'danger',
        pretext: 'An error occured with Airbnbot:',
        text: text,
        footer: 'Airbnbot',
        footer_icon: process.env.AIRBNBOT_ICON_URL,
      },
    ],
  }
}

const fromListingToAttachment = (listing: any, dates: string[]) => {
  return {
    color: 'good',
    title: listing.listing.name,
    title_link: `https://www.airbnb.fr/rooms/${
      listing.listing.id
    }?location=Londres%2C Royaume Uni&adults=2&children=0&infants=0&guests=2&toddlers=0&check_in=${
      dates[0]
    }&check_out=${dates[1]}`,
    text: `_${listing.listing.neighborhood}, ${listing.listing.city}_`,
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

export const homesAttachments = (dates: string[], listings: any) => {
  const homes = listings
    .sort((a: any, b: any) => {
      if (a.pricing_quote.total.amount < b.pricing_quote.total.amount) return -1
      else if (a.pricing_quote.total.amount > b.pricing_quote.total.amount)
        return 1
      return 0
    })
    .slice(0, 5)

  return {
    attachments: homes.map(fromListingToAttachment, dates),
  }
}
