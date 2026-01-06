# Grocery Shopping List API

A simple HTTP service built with Node.js and Express for managing a grocery shopping list.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. GET all items
- **URL:** `GET /api/items`
- **Response:** Returns all grocery items
- **Example:**
```bash
curl http://localhost:3000/api/items
```

### 2. GET item by ID
- **URL:** `GET /api/items/:id`
- **Response:** Returns a single item by ID
- **Example:**
```bash
curl http://localhost:3000/api/items/1
```

### 3. CREATE item
- **URL:** `POST /api/items`
- **Body:** `{ "name": "Bananas", "price": 6, "description": "Fresh yellow bananas" }`
- **Response:** Returns the created item
- **Example:**
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Bananas", "price": 6, "description": "Fresh yellow bananas"}'
```

### 4. UPDATE item
- **URL:** `PUT /api/items/:id`
- **Body:** `{ "name": "Milk", "price": 8, "description": "Whole milk" }` (all fields optional)
- **Response:** Returns the updated item
- **Example:**
```bash
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 8}'
```

### 5. DELETE item
- **URL:** `DELETE /api/items/:id`
- **Response:** Returns success message
- **Example:**
```bash
curl -X DELETE http://localhost:3000/api/items/1
```

## Item Structure

```json
{
  "id": 1,
  "name": "Tomatos",
  "price": 5,
  "description": "The tomato is the edible berry of the plant Solanum lycopersicum..."
}
```

## Notes

- All data is stored in memory and will be reset when the server restarts
- The API uses JSON for request/response bodies
- All endpoints return appropriate HTTP status codes (200, 201, 400, 404)
# shopping-list-api
