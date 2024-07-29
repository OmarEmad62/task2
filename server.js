const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const products = [
    { id: 1, name: 'Samsung A72 SmartPhone', category: 'Electronics', price: 699, brand: 'Samsung', img: 'samsung_smartphone.jpeg' },
    { id: 2, name: 'Dell G12 gaming laptop', category: 'Electronics', price: 999, brand: 'Dell', img: 'Dell_G12_gaming_laptop.jpg' },
    { id: 3, name: 'Jeans', category: 'Clothing', price: 49, brand: 'Nike', img: 'jeans.jpeg' },
    { id: 4, name: 'Samsung m33 SmartPhone', category: 'Electronics', price: 365, brand: 'Samsung', img: 'm33.jpg' },
    { id: 5, name: 'Backpack for laptop', category: 'Clothing', price: 120, brand: 'Dell', img: 'bag.jpg' },
    { id: 6, name: 'Champion soccer ball', category: 'Sports', price: 20, brand: 'Nike', img: 'ball.jpg' },
    { id: 7, name: 'FULL HD Smart Led TV', category: 'Electronics', price: 1200, brand: 'Samsung', img: 'television.jpg' },
    { id: 8, name: 'bookThe Psychology of Money, Atomic Habits: 2 Books Collection Set', category: 'Books', price: 12, brand: 'Caloto', img: 'book.jpg' },
    { id: 9, name: 'Basic Tshirt', category: 'Clothing', price: 62, brand: 'Nike', img: 'basic_tshirt.jpg' },
    { id: 10, name: 'Jeans mens SC11151-3-M Sneaker', category: 'Sports', price: 49, brand: 'Nike', img: 'nike_shoes.jpg' },
];

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = `.${parsedUrl.pathname}`;
    const extname = String(path.extname(pathname)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';

    if (parsedUrl.pathname === '/products' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } else if (parsedUrl.pathname === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        fs.readFile(pathname, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        });
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
