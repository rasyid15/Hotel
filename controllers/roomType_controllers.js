const { response, request } = require('express')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')
const modelRoomType = require('../models/index').room_type

const query = require('sequelize').Op
const upload = require(`./upload_foto_kamar`).single(`photo`)

exports.getAllRoomType = async(request, response) => {

    let roomtypes = await modelRoomType.findAll()
    return response.json({
        success: true,
        data: roomtypes,
        message: 'All room types have been loaded'
    })
}

exports.findRoomType = async(request, response) => {
    let keyword = request.body.keyword

    let roomtypes = await modelRoomType.findAll({
        where: {
            [query.or]: [{
                room_type_name: {
                    [Op.substring]: keyword
                }
            }, {
                harga: {
                    [Op.substring]: keyword
                }
            }]
        }
    })
    return response.json({
        success: true,
        keyword: keyword,
        data: roomtypes,
        message: 'All room types have been loaded'
    })
}

exports.addRoomType = (request, response) => {
    upload(request, response, async(error) => {
        if (error) {
            return response.json({ message: error })
        }
        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }
        let newRoomType = {
            room_type_name: request.body.room_type_name,
            harga: request.body.price,
            descrption: request.body.desc,
            foto: request.file.filename

        }
        modelRoomType.create(newRoomType)
            .then(result => {
                return response.json({
                    success: true,
                    data: result,
                    message: `New Room Type has been inserted`
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

exports.updateRoomType = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        let idRoomType = request.params.id

        let dataRoomType = {
            room_type_name: request.body.room_type_name,
            harga: request.body.price,
            descrption: request.body.desc,
            foto: request.file.filename
        }
        if (request.file) {
            const selectedRoomType = await modelRoomType.findOne({
                where: { id: idRoomType }
            })
            const oldPhoto = selectedRoomType.photo
            const pathPhoto = path.join(__dirname, '../room-photo', oldPhoto)
            if (fs.existsSync(pathPhoto)) {
                fs.unlink(pathPhoto, error =>
                    console.log(error))
            }
            dataRoomType.photo = request.file.filename
        }
        modelRoomType.update(dataRoomType, { where: { id: idRoomType } })
            .then(result => {
                return response.json({
                    success: true,
                    message: `Data Room Type has been updated`
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

exports.deleteRoomType = (request, response) => {

    let idRoomType = request.params.id
    modelRoomType.destroy({ where: { id: idRoomType } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data Room Type has been deleted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}