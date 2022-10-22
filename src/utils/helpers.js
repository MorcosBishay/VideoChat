import { formatRelative } from 'date-fns'

const formatDate = (date) => {
  let formattedDate = ''
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date())
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  }
  return formattedDate
}

export default formatDate
