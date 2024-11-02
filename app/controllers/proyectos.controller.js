const db = require('../config/db.config.js');
const Proyectos = db.Proyectos;

// Crear un nuevo proyecto
exports.create = (req, res) => {
    let proyecto = {};

    try {
        proyecto.titulo = req.body.titulo;
        proyecto.descripcion = req.body.descripcion;
        proyecto.completada = req.body.completada || false;
        proyecto.fecha_creacion = new Date(); // Fecha actual
        proyecto.fecha_vencimiento = req.body.fecha_vencimiento;
        proyecto.prioridad = req.body.prioridad || 'media';
        proyecto.asignado_a = req.body.asignado_a;
        proyecto.categoria = req.body.categoria;
        proyecto.costo_proyecto = req.body.costo_proyecto;

        Proyectos.create(proyecto).then(result => {
            res.status(200).json({
                message: "Proyecto creado exitosamente con ID = " + result.id,
                proyecto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Recuperar todos los proyectos
exports.retrieveAllProyectos = (req, res) => {
    Proyectos.findAll()
        .then(proyectoInfos => {
            res.status(200).json({
                message: "Obtención de todos los proyectos exitosa!",
                proyectos: proyectoInfos
            });
        })
        .catch(error => {
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

// Obtener un proyecto por su ID
exports.getProyectoById = (req, res) => {
    let proyectoId = req.params.id;
    Proyectos.findByPk(proyectoId)
        .then(proyecto => {
            if (proyecto) {
                res.status(200).json({
                    message: "Proyecto obtenido con éxito con ID = " + proyectoId,
                    proyecto: proyecto
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el proyecto con ID = " + proyectoId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

// Actualizar un proyecto por su ID
exports.updateById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyectos.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "No se encontró el proyecto con ID = " + proyectoId,
                error: "404"
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                completada: req.body.completada,
                fecha_vencimiento: req.body.fecha_vencimiento,
                prioridad: req.body.prioridad,
                asignado_a: req.body.asignado_a,
                categoria: req.body.categoria,
                costo_proyecto: req.body.costo_proyecto
            };

            let result = await Proyectos.update(updatedObject, { returning: true, where: { id: proyectoId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el proyecto con ID = " + proyectoId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Proyecto actualizado exitosamente con ID = " + proyectoId,
                    proyecto: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el proyecto con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un proyecto por su ID
exports.deleteById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyectos.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "No existe un proyecto con ID = " + proyectoId,
                error: "404"
            });
        } else {
            await proyecto.destroy();
            res.status(200).json({
                message: "Proyecto eliminado exitosamente con ID = " + proyectoId,
                proyecto: proyecto
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el proyecto con ID = " + req.params.id,
            error: error.message
        });
    }
}