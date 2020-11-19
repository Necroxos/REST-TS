const express = require('express');

let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const _ = require('underscore');

let app = express();

let Categoria = require('../models/categoria');

app.get('/categoria', (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });

        });
});

app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findById(id)
        .populate('usuario', 'nombre email')
        .exec((err, categoria) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!categoria) {
                return res.status(400).json({
                    ok: false,
                    err: 'Categoria no encontrada'
                });
            }

            res.json({
                ok: true,
                categoria
            });

        })
});

app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: 'Categoría no se pudo crear'
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});

app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion', '_id', 'estado']);

    Categoria.findByIdAndUpdate(id, body, { new: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: 'Categoria no encontrada'
            });
        }

        res.json({
            ok: true,
            usuario: categoriaDB
        });
    });
});

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaBorrado) {
            return res.status(400).json({
                ok: false,
                err: 'Categoria no encotrada'
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBorrado
        });
    });
});


module.exports = app;