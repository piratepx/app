function pick(obj, keys) {
  if (!obj) {
    return null
  }

  const picked = {}

  keys.forEach((key) => {
    if (key in obj) {
      picked[key] = obj[key]
    }
  })

  return picked
}

export default pick
