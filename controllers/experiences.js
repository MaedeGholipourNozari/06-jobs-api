const Experience = require('../models/Experience')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllExperiences = async (req, res) => {
  
  res.send({ msg: 'get all experiences' })
}
const getExperience = async (req, res) => {
  res.send({ msg: 'get single experience' })
}

const createExperience = async (req, res) => {
  req.body.createdBy = req.user.userId
  const experience = await Experience.create(req.body)
  res.status(StatusCodes.CREATED).json({ experience })
}

const updateExperience = async (req, res) => {
  res.send({ msg: 'update experience' })
}

const deleteExperience = async (req, res) => {
  res.send({ msg: 'delete experience' })
}

module.exports = {
  createExperience,
  deleteExperience,
  getAllExperiences,
  updateExperience,
  getExperience,
}
