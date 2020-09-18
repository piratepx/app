export function dateTimeFormat(timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export default function toISODateString({
  date,
  format = null,
  timeZone = null,
}) {
  const formatter = format || dateTimeFormat(timeZone)

  const parts = formatter.formatToParts(date)
  const year = parts.find((part) => part.type === 'year').value
  const month = parts.find((part) => part.type === 'month').value
  const day = parts.find((part) => part.type === 'day').value

  return `${year}-${month}-${day}`
}
