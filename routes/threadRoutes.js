const express = require('express');
const threads = require('../controllers/thread');
const { verifyTokenAndAdmin } = require('../middleware/authmiddleware');
const { imageUpload } = require('../middleware/imageUpload');

const threadRoutes = express.Router();

threadRoutes.get('/threads',  threads.threads);
threadRoutes.get('/thread/readImage/:filename', threads.readImage);
threadRoutes.post('/thread',verifyTokenAndAdmin,imageUpload.single('image'),threads.createthread);
threadRoutes.get('/thread/:id', verifyTokenAndAdmin, threads.thread);
threadRoutes.get('/updatethreadview/:id',threads.update_view);
threadRoutes.put('/thread/:id',verifyTokenAndAdmin,imageUpload.single('image'),threads.updatethread);
threadRoutes.delete('/thread/:id',verifyTokenAndAdmin, threads.deletethread);

module.exports = threadRoutes;