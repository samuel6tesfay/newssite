const express = require('express');
const scolarships = require('../controllers/scolarship');
const { verifyTokenAndAdmin } = require('../middleware/authmiddleware');
const { imageUpload } = require('../middleware/imageUpload');

const scolarshipRoutes = express.Router();

scolarshipRoutes.get('/scolarships',  scolarships.scolarships);
scolarshipRoutes.get('/scolarship/readImage/:filename', scolarships.readImage);
scolarshipRoutes.post('/scolarship',verifyTokenAndAdmin,imageUpload.single('image'),scolarships.createscolarship);
scolarshipRoutes.get('/scolarship/:id',verifyTokenAndAdmin,scolarships.scolarship);
scolarshipRoutes.put('/scolarship/:id',verifyTokenAndAdmin,scolarships.updatescolarship);
scolarshipRoutes.delete('/scolarship/:id',verifyTokenAndAdmin, scolarships.deletescolarship);

module.exports = scolarshipRoutes;