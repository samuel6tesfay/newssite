const express = require('express');
const threads = require('../controllers/thread');
const { verifyTokenAndAdmin } = require('../middleware/authmiddleware');
const upload = require("../middleware/imageUpload");

const threadRoutes = express.Router();

threadRoutes.get('/threads',  threads.threads);
threadRoutes.post('/thread',verifyTokenAndAdmin,upload.single('image'),threads.createthread);
threadRoutes.get('/thread/:id', verifyTokenAndAdmin, threads.thread);
threadRoutes.get('/updatethreadview/:id',threads.update_view);
threadRoutes.put('/thread/:id',verifyTokenAndAdmin,upload.single('image'),threads.updatethread);
threadRoutes.delete('/thread/:id',verifyTokenAndAdmin, threads.deletethread);

module.exports = threadRoutes;  