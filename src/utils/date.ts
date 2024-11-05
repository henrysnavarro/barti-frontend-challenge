export function getOrdinalSuffix(n: number) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Given a number of milliseconds or a string in the format 'MM/dd/yyyy',
 * formats a date as 'Month <ordinal>Day, Year'
 *
 * @param {number | null} milliseconds A number of milliseconds to format
 * or null if formatting a string
 * @param {string} dateString A string in the format 'MM/dd/yyyy'
 * @returns {string} The formatted date string
 */
export function getOrdinalFormattedDate(
  milliseconds: number | null,
  dateString: string
) {
  const date = milliseconds ? new Date(milliseconds) : new Date(dateString);
  return `${date.toLocaleString('en-US', { month: 'long' })} ${getOrdinalSuffix(
    date.getDate()
  )}, ${date.getFullYear()}`;
}
