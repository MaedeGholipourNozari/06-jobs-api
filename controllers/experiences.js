const Experience = require('../models/Experience')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllExperiences = async (req, res) => {
   const experiences = await Experience.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ experiences, count: experiences.length })
}
const getExperience = async (req, res) => {
   const {
    user: { userId },
    params: { id: experienceId },
  } = req

  const experience = await Experience.findOne({
    _id: experienceId,
    createdBy: userId,
  })
  if (!experience) {
    throw new NotFoundError(`No job with id ${experienceId}`)
  }
  res.status(StatusCodes.OK).json({ experience })
}

const createExperience = async (req, res) => {
  req.body.createdBy = req.user.userId
  const experience = await Experience.create(req.body)
  res.status(StatusCodes.CREATED).json({ experience })
}

const updateExperience = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: experienceId },
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }
  const experience = await Experience.findByIdAndUpdate(
    { _id: experienceId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!experience) {
    throw new NotFoundError(`No experience with id ${experienceId}`)
  }
  res.status(StatusCodes.OK).json({ experience })
}

const deleteExperience = async (req, res) => {
  const {
    user: { userId },
    params: { id: experienceId },
  } = req

  const experience = await Experience.findByIdAndRemove({
    _id: experienceId,
    createdBy: userId,
  })
  if (!experience) {
    throw new NotFoundError(`No experience with id ${experienceId}`)
  }
 res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
}

module.exports = {
  createExperience,
  deleteExperience,
  getAllExperiences,
  updateExperience,
  getExperience,
}
