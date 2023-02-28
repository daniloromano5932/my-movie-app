export function formatMovieDuration(duration: number) {
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

export function getReleaseYear(date: string) {
  return new Date(date).toLocaleDateString('en-UK', { year: "numeric" })
}

export function formatDate(date: string) {
  if (!date) {
    return ''
  }
  return new Date(date).toLocaleDateString('en-UK', { day: "numeric", month: "short", year: "numeric" });
}

export function formatDateNumeric(date: string) {
  if (!date) {
    return ''
  }
  return new Date(date).toLocaleDateString('en-UK', { day: "numeric", month: "numeric", year: "numeric" });
}

export function calculateDateDifferenceInYears (date1: string, date2 = new Date()) {
  var diff_ms = new Date(date2).getTime() - new Date(date1).getTime();
  return Math.floor(diff_ms/(1000 * 60 * 60 * 24 * 365.25))
}



