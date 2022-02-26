const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

app.post('/admin', async function (req, res) {
    let body = _.pick(req.body, ['nombre', 'email', 'password']);

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: 'ADMIN_ROLE'
    });

    Usuario.estimatedDocumentCount({ role: 'ADMIN_ROLE' }, (err, conteo) => {
        if (conteo != 0) { 
            return res.status(400).json({
                ok: false,
                err: { errors: { message: 'Ya existe un administrador' } }
            });
        } else {
            usuario.save((err, usuarioDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
    
                res.json({
                    usuario: usuarioDB
                });
    
            });
        }
    });
});

module.exports = app;