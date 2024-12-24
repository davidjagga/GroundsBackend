const express = require('express');
const router = express.Router();
const { PrismaClient, Approval } = require('@prisma/client');

const prisma = new PrismaClient();

// Test route for GET request
router.get('/', (req, res) => {
    res.status(200).json({ message: 'GET request to /test is working!' });
});

// Test route for POST request
router.post('/', (req, res) => {
    const { name } = req.body;
    res.status(201).json({ message: `POST request received! Hello, ${name || 'Guest'}` });
});

// Test route for dynamic URL
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `GET request to /test/${id} is working!` });
});

module.exports = router;
