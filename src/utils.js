export function formatMovieDuration(duration) {
  if (duration < 60) {
    return duration + "m"
  } else {
    if (duration % 60 !== 0) {
      return Math.floor(duration / 60) + "h " + duration % 60 + "m";
    } else {
      return Math.floor(duration / 60) + "h";
    }
  }
}

export function getReleaseYear(date) {
  return new Date(date).toLocaleDateString('en-UK', { year: "numeric" })
}

export function getReleaseDate(date) {
  if (!date) {
    return ''
  }
  return new Date(date).toLocaleDateString('en-UK', { day: "numeric", month: "short", year: "numeric" });
}

export function getReleaseDateNumeric(date) {
  if (!date) {
    return ''
  }
  return new Date(date).toLocaleDateString('en-UK', { day: "numeric", month: "numeric", year: "numeric" });
}
