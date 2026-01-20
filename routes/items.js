const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  searchItems
} = require('../data/items');

/**
 * Parse and validate ID parameter
 * @param {string} idString - The ID string from request params
 * @returns {number|null} Parsed ID or null if invalid
 */
function parseId(idString) {
  const id = parseInt(idString, 10);
  return isNaN(id) ? null : id;
}

/**
 * Validate item data for creation
 * @param {Object} data - Item data to validate
 * @returns {Object|null} Error object if validation fails, null otherwise
 */
function validateItemData(data) {
  const { name, price, description } = data;

  if (!name || price === undefined) {
    return { error: 'Missing required fields: name and price are required' };
  }

  if (typeof price !== 'number' || price < 0) {
    return { error: 'Price must be a non-negative number' };
  }

  return null;
}

/**
 * Validate price for update
 * @param {number} price - Price value to validate
 * @returns {Object|null} Error object if validation fails, null otherwise
 */
function validatePrice(price) {
  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    return { error: 'Price must be a non-negative number' };
  }
  return null;
}

/**
 * GET /api/items
 * Retrieve all grocery items or search items by name
 */
router.get('/', (req, res) => {
  const { search } = req.query;
  
  if (search) {
    const items = searchItems(search);
    return res.json({ items });
  }
  
  const items = getAllItems();
  res.json({ items });
});

/**
 * GET /api/items/:id
 * Retrieve a single grocery item by ID
 */
router.get('/:id', (req, res) => {
  const id = parseId(req.params.id);
  
  if (id === null) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const item = getItemById(id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json({ item });
});

/**
 * POST /api/items
 * Create a new grocery item
 */
router.post('/', (req, res) => {
  const validationError = validateItemData(req.body);
  if (validationError) {
    return res.status(400).json(validationError);
  }

  const { name, price, description } = req.body;
  const newItem = createItem(name, price, description || '');
  res.status(201).json({ item: newItem });
});

/**
 * PUT /api/items/:id
 * Update an existing grocery item
 */
router.put('/:id', (req, res) => {
  const id = parseId(req.params.id);
  
  if (id === null) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const priceError = validatePrice(req.body.price);
  if (priceError) {
    return res.status(400).json(priceError);
  }

  const updatedItem = updateItem(id, req.body);
  
  if (!updatedItem) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json({ item: updatedItem });
});

/**
 * DELETE /api/items/:id
 * Delete a grocery item by ID
 */
router.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  
  if (id === null) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const deleted = deleteItem(id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json({ message: 'Item deleted successfully' });
});

module.exports = router;
