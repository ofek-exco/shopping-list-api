// In-memory storage for grocery items
let groceryItems = [
  { 
    id: 1, 
    name: 'Tomatos', 
    price: 5, 
    description: 'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The species originated in western South America and Central America.' 
  },
  { id: 2, name: 'Cucumbers', price: 3, description: 'Cucumber is a widely-cultivated creeping vine plant in the family Cucurbitaceae that bears cylindrical to spherical fruits.' },
  { id: 3, name: 'Bread', price: 10, description: 'Bread is a staple food prepared from a dough of flour and water, usually by baking.' },
  { id: 4, name: 'Grapes', price: 4, description: 'A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis.' }
];

let nextId = 6;

/**
 * Get all grocery items
 * @returns {Array} Array of all grocery items
 */
function getAllItems() {
  return groceryItems;
}

/**
 * Get a grocery item by ID
 * @param {number} id - The ID of the item to retrieve
 * @returns {Object|null} The item if found, null otherwise
 */
function getItemById(id) {
  return groceryItems.find(item => item.id === id) || null;
}

/**
 * Find the index of an item by ID
 * @param {number} id - The ID of the item
 * @returns {number} The index of the item, or -1 if not found
 */
function findItemIndex(id) {
  return groceryItems.findIndex(item => item.id === id);
}

/**
 * Create a new grocery item
 * @param {string} name - The name of the item
 * @param {number} price - The price of the item
 * @param {string} description - The description of the item
 * @returns {Object} The newly created item
 */
function createItem(name, price, description) {
  const newItem = {
    id: nextId++,
    name: name.trim(),
    price,
    description: description ? description.trim() : ''
  };
  groceryItems.push(newItem);
  return newItem;
}

/**
 * Update an existing grocery item
 * @param {number} id - The ID of the item to update
 * @param {Object} updates - Object containing fields to update (name, price, description)
 * @returns {Object|null} The updated item if found, null otherwise
 */
function updateItem(id, updates) {
  const itemIndex = findItemIndex(id);
  if (itemIndex === -1) {
    return null;
  }

  const currentItem = groceryItems[itemIndex];

  if (updates.name !== undefined) {
    currentItem.name = updates.name.trim();
  }
  if (updates.price !== undefined) {
    currentItem.price = updates.price;
  }
  if (updates.description !== undefined) {
    currentItem.description = updates.description.trim();
  }

  return currentItem;
}

/**
 * Delete a grocery item by ID
 * @param {number} id - The ID of the item to delete
 * @returns {boolean} True if item was deleted, false if not found
 */
function deleteItem(id) {
  const itemIndex = findItemIndex(id);
  if (itemIndex === -1) {
    return false;
  }

  groceryItems.splice(itemIndex, 1);
  return true;
}

/**
 * Search items by name using regex pattern
 * @param {string} pattern - Regex pattern to search for in item names
 * @returns {Array} Array of items matching the search pattern
 */
function searchItems(pattern) {
  if (!pattern) {
    return [];
  }

  try {
    const regex = new RegExp(pattern, 'i');
    return groceryItems.filter(item => regex.test(item.name));
  } catch (error) {
    return [];
  }
}

module.exports = {
  getAllItems,
  getItemById,
  findItemIndex,
  createItem,
  updateItem,
  deleteItem,
  searchItems
};
