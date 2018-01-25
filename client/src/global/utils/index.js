const txtRecent = 'About a minute ago'

export const getTimeDifference = (testRan) => {
  const now = new Date()
  let difference = Math.floor(Math.abs(now - testRan) / 60000)
  let unit = 'minutes'
  if (difference > 180) {
    if (difference > 2880) {
      difference = Math.floor(difference / 1440)
      unit = 'days'
    } else {
      difference = Math.floor(difference / 60)
      unit = 'hours'
    }
  }

  return difference > 2 ? `${difference} ${unit} ago` : txtRecent
}
