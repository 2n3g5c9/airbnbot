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

export const homesAttachments = (listings: any, dates: string[]) => {
  const homes: any = listings
    .filter((listing: any) => {
      return listing.listing.badges.includes('PERLE RARE')
    })
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
