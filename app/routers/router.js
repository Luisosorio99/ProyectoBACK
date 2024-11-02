const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectos.controller'); 

router.get('/proyectos/obtener', proyectosController.retrieveAllProyectos);
router.post('/proyectos/crear', proyectosController.create);
router.get('/proyectos/:id', proyectosController.getProyectoById);
router.put('/proyectos/actualizar/:id', proyectosController.updateById);
router.delete('/proyectos/eliminar/:id', proyectosController.deleteById);

module.exports = router;