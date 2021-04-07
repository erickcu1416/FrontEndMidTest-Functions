import bcrypt = require('bcryptjs')
import { Router } from "express";
import { createUser, getUserById } from "../repository/userReposiroty";
import jwt = require('jsonwebtoken')

const authRoutes = Router();
authRoutes.post("/signin", async (req, res) => {
    // res.set('Access-Control-Allow-Origin', "*")
    // res.set('Access-Control-Allow-Methods', 'GET, POST')
    // res.set('Access-Control-Allow-Headers', 'Content-Type');
    let body = req.body;
    const user = {
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    };

    let data: any = await createUser(user);
    delete data.password;
    res.status(200).json({
        ok: true,
        user: data
    })
})

authRoutes.post('/login', async (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    // res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    // res.set('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        return res.end();
    }
    let body = req.body;
    console.log('[BODY]', body);
    if (!body.email || !body.password) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Completa todos los campos para continuar'
            }
        });
    }

    const user = await getUserById(body.email);
    console.log('[USER]', user)
    if (user) {
        if (!bcrypt.compareSync(body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (Contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            user: user
        }, 'este-es-el-sed-desarollo', { expiresIn: 60 * 60 * 24 * 30 });
        delete user.password;
        res.status(200).json({
            ok: true,
            user: user,
            token
        });
    }

    return res.status(400).json({
        ok: false,
        err: {
            message: '(Usuario) o Contraseña incorrectos'
        }
    });
})

export default authRoutes;