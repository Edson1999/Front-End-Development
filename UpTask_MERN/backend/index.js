// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import conectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());
// Environment variables
dotenv.config();
// Connect to Db
conectDB();

// Routing
app.use('/api/users', userRoutes);

// Port environment variable (server side)
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
});
