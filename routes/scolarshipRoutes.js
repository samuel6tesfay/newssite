const express = require('express');
const scolarships = require('../controllers/scolarship');
const { verifyTokenAndAdmin } = require('../middleware/authmiddleware');
const  upload  = require('../middleware/imageUpload');

const scolarshipRoutes = express.Router();

scolarshipRoutes.get('/scolarships',  scolarships.scolarships);
scolarshipRoutes.post('/scolarship',verifyTokenAndAdmin,upload.single('image'),scolarships.createscolarship);
scolarshipRoutes.get('/scolarship/:id',verifyTokenAndAdmin,scolarships.scolarship);
scolarshipRoutes.put('/scolarship/:id', verifyTokenAndAdmin,upload.single('image'), scolarships.updatescolarship);
scolarshipRoutes.delete('/scolarship/:id',verifyTokenAndAdmin, scolarships.deletescolarship);

module.exports = scolarshipRoutes;