# Buyfy - Responsive E-commerce Website

Buyfy is a responsive e-commerce website project built with HTML, CSS, and vanilla JavaScript on the client-side. It allows users to browse through various products, add items to their cart. It is a UI extensive project.

## Installation

1. Clone the repository
2. Install the dependencies: ```npm install```
3. Start the server: ```node src/app.js```

### API Endpoint
The project uses an API endpoint to serve product data to the client. The API endpoint is defined in src/app.js and returns an array of product objects.
```
app.get('/api/products', (req, res) => {
  res.json(products);
});
```

### Note:- _Additonal functionalities may be built upon._
