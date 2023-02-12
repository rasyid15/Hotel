const { response, request } = require('express')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')
const user = require('../models/user')
const { JsonWebTokenError } = require('jsonwebtoken')
const SECRET_KEY = "secretcode"
const modelUser = require('../models/index').user
const md5 = require("md5")
const query = require('sequelize').Op
const upload = require(`./upload_foto`).single(`foto`)



exports.getAllUser = async(request, response) => {

    let users = await modelUser.findAll()
    return response.json({
        success: true,
        data: users,
        message: 'All Users have been loaded'
    })
}

exports.login = async(request, response) => {
    try {
        const params = {
            email: email.request.body,
            password: password.request.body
        }
        const findUser = await user.findOne({ where: params });
        if (findUser == null) {
            return response.status(404).json({
                message: "email or password doesn't match",
                err: error
            });
        }
        console.log(findUser);
        let tokenPayload = {
            id_user: findUser.id_customer,
            email: findUser.email,
            role: findUser.role
        };
        tokenPayload = JSON.stringify(tokenPayload);
        let token = await JsonWebTokenError.sign(tokenPayload, SECRET_KEY);

        return response.status(200).json({
            message: "Success login",
            data: {
                token: token,
                id_user: findUser.id_user,
                email: findUser.email,
                role: findUser.role
            }
        })
    } catch (err) {
        console.log(err);
        return response.status(500).json({
            message: "Internal Error",
            err: err,
        })
    }
}

exports.findUser = async(request, response) => {
    let keyword = request.body.keyword

    let users = await modelUser.findAll({
        where: {
            [query.or]: [{
                nama_user: {
                    [Op.substring]: keyword
                }
            }, {
                email: {
                    [Op.substring]: keyword
                }
            }, {
                role: {
                    [Op.substring]: keyword
                }
            }]
        }
    })
    return response.json({
        success: true,
        keyword: keyword,
        data: users,
        message: 'All Users have been loaded'
    })
}

exports.addUser = (request, response) => {
    upload(request, response, async(error) => {
        if (error) {
            return response.json({ message: error })
        }
        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }
        let newUser = {
            nama_user: request.body.nama_user,
            email: request.body.email,
            password: request.body.password,
            role: request.body.role,
            foto: request.file.filename

        }
        modelUser.create(newUser)
            .then(result => {
                return response.json({
                    success: true,
                    data: result,
                    message: `New user has been inserted`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

exports.updateUser = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        let idUser = request.params.id

        let dataUser = {
            nama_user: request.body.nama_user,
            email: request.body.email,
            password: request.body.password,
            role: request.body.role,

        }
        if (request.file) {
            const selectedUser = await modelUser.findOne({
                where: { id: idUser }
            })
            const oldFoto = selectedUser.foto
            const pathFoto = path.join(__dirname, '../foto', oldFoto)
            if (fs.existsSync(pathFoto)) {
                fs.unlink(pathFoto, error =>
                    console.log(error))
            }
            user.Foto = request.file.filename
        }
        modelUser.update(dataUser, { where: { id: idUser } })
            .then(result => {
                return response.json({
                    success: true,
                    message: `Data user has been updated`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })

}

exports.deleteUser = (request, response) => {

    let idUser = request.params.id
    modelUser.destroy({ where: { id: idUser } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data user has been deleted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}