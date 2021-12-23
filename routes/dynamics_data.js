const express = require('express');
const headers = require('../controllers/dynamic_data/header');
const about_scolarships = require('../controllers/dynamic_data/about_scolarship');
const contacts = require('../controllers/dynamic_data/contact');
const footers = require('../controllers/dynamic_data/footer');
const { verifyTokenAndAdmin } = require('../middleware/authmiddleware');
const  upload  = require('../middleware/imageUpload');

const headerRoutes = express.Router();
const aboutScolarshipRoutes = express.Router();
const contactRoutes = express.Router();
const footerRoutes = express.Router();

headerRoutes.get('/headers',  headers.headers);
headerRoutes.post('/header',verifyTokenAndAdmin,headers.create_header);
headerRoutes.get('/header/:id',verifyTokenAndAdmin,headers.header);
headerRoutes.put('/header/:id',verifyTokenAndAdmin,headers.update_header);
headerRoutes.delete('/header/:id', verifyTokenAndAdmin, headers.delete_header);

aboutScolarshipRoutes.get('/about_scolarships', about_scolarships.about_scolarships);
aboutScolarshipRoutes.post('/about_scolarship',verifyTokenAndAdmin,upload.single('image'),about_scolarships.create_about_scolarship);
aboutScolarshipRoutes.get('/about_scolarship/:id',verifyTokenAndAdmin,about_scolarships.about_scolarship);
aboutScolarshipRoutes.put('/about_scolarship/:id',verifyTokenAndAdmin,upload.single('image'),about_scolarships.update_about_scolarship);
aboutScolarshipRoutes.delete('/about_scolarship/:id',verifyTokenAndAdmin, about_scolarships.delete_about_scolarship);

contactRoutes.get('/contacts',  contacts.contacts);
contactRoutes.post('/contact',verifyTokenAndAdmin,contacts.create_contact);
contactRoutes.get('/contact/:id',verifyTokenAndAdmin,contacts.contact);
contactRoutes.put('/contact/:id',verifyTokenAndAdmin,contacts.update_contact);
contactRoutes.delete('/contact/:id',verifyTokenAndAdmin, contacts.delete_contact);

footerRoutes.get('/footers',  footers.footers);
footerRoutes.post('/footer',verifyTokenAndAdmin,footers.create_footer);
footerRoutes.get('/footer/:id',verifyTokenAndAdmin,footers.footer);
footerRoutes.put('/footer/:id',verifyTokenAndAdmin,footers.update_footer);
footerRoutes.delete('/footer/:id',verifyTokenAndAdmin, footers.delete_footer);

module.exports = {
    headerRoutes,aboutScolarshipRoutes,contactRoutes,footerRoutes
}