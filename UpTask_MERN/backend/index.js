// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
app.use(express.json());
app.use(express.static('public'));
// Environment variables
dotenv.config();
// Connect to Db
connectDB();
// Cors configuration
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Check API
      callback(null, true);
    } else {
      // Don't have permissions
      callback(new Error('Cors Error'));
    }
  },
};

app.use(cors(corsOptions));

// Routing
app.use('/api/users', userRoutes);
// Project Routing
app.use('/api/projects', projectRoutes);
// Task Routing
app.use('/api/tasks', taskRoutes);

// Port environment variable (server side)
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
});

// Socket.io
import { Server } from 'socket.io';

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on('connection', (socket) => {
  console.log('Conectado a Socket.io');

  //Define socket.io events
  socket.on('open project', (project) => {
    socket.join(project);
  });

  socket.on('new task', (task) => {
    const project = task.project;
    socket.to(project).emit('task added', task);
  });

  socket.on('delete task', (task) => {
    const project = task.project;
    socket.to(project).emit('task deleted', task);
  });

  socket.on('update task', (task) => {
    const project = task.project._id;
    socket.to(project).emit('task updated', task);
  });

  socket.on('task complete', (task) => {
    const project = task.project._id;
    socket.to(project).emit('task completed', task);
  });
});
