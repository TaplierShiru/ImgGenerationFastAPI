/**
 * Generate random integer between input `min` and `max` values
 * @param min Minimum value for integer generation
 * @param max Maximum value for inteter generation
 * @returns Number as Integer between `min` and `max` (inclusive)
 */
export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate value from 0 to `max` and return integer value between
 * @param max Maximum value for integer generation
 * @returns Random number as integer between 0 and `max` (inclusive)
 */
export function getRandomInt(max: number) {
  return getRandomIntInclusive(0, max);
}
