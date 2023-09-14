// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
app.use(express.json());
// Environment variables
dotenv.config();
// Connect to Db
connectDB();

// Routing
app.use('/api/users', userRoutes);
// Project Routing
app.use('/api/projects', projectRoutes);

// Port environment variable (server side)
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
});
