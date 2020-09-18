const formatter = new Intl.NumberFormat()

export function formatNumberLong(number) {
  return formatter.format(number)
}

export function formatNumberShort(number) {
  if (number <= 999) {
    return number
  } else if (number <= 9999) {
    return `${(number / 1000).toFixed(1)}k`
  } else if (number <= 999999) {
    return `${Math.round(number / 1000)}k`
  } else if (number <= 999999999) {
    return `${Math.round(number / 1000000)}m`
  } else if (number <= 999999999999) {
    return `${Math.round(number / 1000000000)}b`
  } else if (number <= 999999999999999) {
    return `${Math.round(number / 1000000000000)}t`
  } else {
    return '∞'
  }
}
