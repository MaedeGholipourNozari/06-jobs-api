const express = require('express')

const router = express.Router()
const {
  createExperience,
  deleteExperience,
  getAllExperiences,
  updateExperience,
  getExperience,
} = require('../controllers/experiences')

router.route('/').post(createExperience).get(getAllExperiences)

router.route('/:id').get(getExperience).delete(deleteExperience).patch(updateExperience)

module.exports = router
