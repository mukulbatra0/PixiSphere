/**
 * @typedef {Object} Review
 * @property {string} name
 * @property {number} rating
 * @property {string} comment
 * @property {string} date
 */

/**
 * @typedef {Object} Photographer
 * @property {number} id
 * @property {string} name
 * @property {string} location
 * @property {number} price
 * @property {number} rating
 * @property {string[]} styles
 * @property {string[]} tags
 * @property {string} bio
 * @property {string} profilePic
 * @property {string[]} portfolio
 * @property {Review[]} reviews
 */

/**
 * @typedef {"price-low" | "price-high" | "rating" | "recent"} SortOption
 */

/**
 * @typedef {Object} FilterState
 * @property {[number, number]} priceRange
 * @property {number} minRating
 * @property {string[]} styles
 * @property {string} city
 * @property {string} searchQuery
 * @property {SortOption} sortBy
 */

export {};