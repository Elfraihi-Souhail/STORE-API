# Store API 🛒

A RESTful API built with Node.js, Express, and MongoDB for managing a product inventory. This project was built to solidify understanding of backend fundamentals and modern development practices.

## 🚀 Features & Learning Objectives

This API demonstrates my hands-on experience with:

*   **RESTful Principles**: Clean endpoint design following REST conventions.
*   **Advanced Querying**: Filter, sort, select fields, and paginate results directly via URL queries.
*   **Middleware Integration**: Custom error handling and async management.
*   **MongoDB with Mongoose**: Data modeling, validation, and connection management.
*   **Environment Configuration**: Using `dotenv` for secure configuration.
*   **Data Seeding**: Script to populate the database with sample data.

## 📦 API Endpoints
 
| Method  |       Endpoint     |      Description   |                                    Query Parameters                                |
| **GET** | `/api/v1/products` | Fetch all products | `name`, `featured`, `company`, `sort`, `fields`, `limit`, `page`, `numericFilters` |

### Query Parameters Explained:

*   `name`: Filter by product name (case-insensitive)
    *   Example: `?name=wooden`
*   `featured`: Filter featured products (`true`/`false`)
    *   Example: `?featured=true`
*   `company`: Filter by company name (`ikea`, `liddy`, `caressa`, `marcos`)
    *   Example: `?company=ikea`
*   `sort`: Sort results by any field (use `-` for descending)
    *   Example: `?sort=price,-rating`
*   `fields`: Select specific fields to return (Projection)
    *   Example: `?fields=name,price`
*   `limit` & `page`: Control pagination (default: 10 items per page)
    *   Example: `?limit=5&page=2`
*   `numericFilters`: Apply filters to numeric fields (`price`, `rating`) using operators (`<`, `<=`, `>`, `>=`, `=`)
    *   Example: `?numericFilters=price>=30,rating>4`

## 🛠️ Tech Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB
*   **ODM**: Mongoose
*   **Environment Management**: dotenv
*   **Async Error Handling**: express-async-handler

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd store-api
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGO_URI=your_mongodb_connection_string_here
    PORT=3000
    ```

4.  **Populate the database** (Optional)
    Run the script to seed your database with sample products:
    ```bash
    node populate.js
    ```

5.  **Start the development server**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000`.

## 🧪 Example Usage

**Get all products from 'ikea', show only their name and price, sorted by price (ascending):**
```bash
GET /api/v1/products?company=ikea&fields=name,price&sort=price
```

**Get featured products with a price greater than or equal to 100:**
```bash
GET /api/v1/products?featured=true&numericFilters=price>=100
```

**Response Schema:**
```json
{
  "products": [...],
  "nbHits": 5
}
```

## 📁 Project Structure

```
store-api/
├── controllers/     # Route handlers (logic)
│   └── products.js
├── models/          # Mongoose schemas & models
│   └── product.js
├── middleware/      # Custom middleware
│   ├── error-handler.js
│   └── not-found.js
├── routes/          # Express routers
│   └── products.js
├── db/             # Database connection
│   └── connect.js
├── products.json   # Sample data for seeding
├── populate.js     # Database seeding script
└── app.js          # Main application entry point
```
