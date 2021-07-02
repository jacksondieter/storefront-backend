# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API url `http://localhost:port/`
#### Auth
- Login: `[POST] http://localhost:port/login`
- Signup: `[POST] http://localhost:port/signup`
- Show [token required]:  `[GET] http://localhost:port/profile`

#### API Endpoints - `http://localhost:port/api`

#### Products
- Index: ` [GET] /products `
- Create [token required]:  `[POST] /products`
- Show (args: product id): `[GET] /products/:id`
- Update (args: product id) [token required]:  `[POST] /products/:id`
- Delete (args: product id) [token required]:  `[DELETE] /products/:id`
- Top 5 most popular products:  `[GET] /products/popular`
- Products by category (args: product category):  `[GET] /products/by_category/:id`

#### Users
- Index [token required]:  `[GET] /admin/users`
- Create [token required]:  `[POST] /admin/users`
- Show [token required]:  `[GET] /admin/users/:id`
- Delete (args: user id) [token required]:  `[DELETE] /admin/users/:id`
- Index  [token required]: `[GET] /admin/orders`

#### Orders
- Current Order by user (args: user id)[token required] :  : `[GET] /orders`
- Create [token required]:  `[POST] /orders`
- Show (args: order id): `[GET] /orders/:id`
- Update (args: order id) [token required]:  `[POST] /orders/:id`
- Delete (args: order id) [token required]:  `[DELETE] /orders/:id`
- Get products in order (args: order id) [token required]:  `[POST] /orders/:id/products`
- Add product to order (args: order id) [token required]:  `[POST] /orders/:id/products`
- Delete product from order (args: order id) [token required]:  `[DELETE] /orders/:id/products/:id`
- Completed Orders by user (args: user id)[token required]:  `[GET] /orders/completed`

## Data Shapes
#### Product
-  id : PK
- name : string
- price : number
- category : string

#### User
- id : PK
- username : string
- firstName : string
- lastName : string
- password : string

#### Orders
- id : PK
- user_id : FK
- status : (active,completed)

#### OrderProducts
- id : PK
- order_id : FK
- product_id : FK
- quantity : number


## Database Schema
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  price FLOAT,
  category VARCHAR
)

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  firstName VARCHAR,
  lastName VARCHAR,
  password VARCHAR
)

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status INTEGER
)

CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER
)
