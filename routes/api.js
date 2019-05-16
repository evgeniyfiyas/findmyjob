var path = require('path')
var express = require('express');
var router = express.Router();
var registerController = require('../controllers/RegisterController');
var loginController = require('../controllers/LoginController');
var userController = require('../controllers/UserController');
var vacancyController = require('../controllers/VacancyController');
var technologyController = require('../controllers/TechnologyController');
var technologySeeder = require('../seeders/mongodb-seeders/demo-technologies');
const passport = require('../passport');
var multer  = require('multer')

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });

/**
 * @swagger
 *
 * /user:
 *   post:
 *     tags:
 *       - user
 *     summary: Create new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User's email.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: passwordConfirmation
 *         description: User's confirmation of the password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: firstname
 *         description: User's first name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastname
 *         description: User's last name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: avatar
 *         description: User's avatar.
 *         in: formData
 *         required: false
 *         type: file
 *       - name: age
 *         description: User's age.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: phone
 *         description: User's phone.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: technology
 *         description: Technologies that user knows.
 *         in: formData
 *         type: object
 *         properties:
 *          name:
 *            type: string
 *          level:
 *            type: string
 *       - name: github_link
 *         description: User's github link.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: bio
 *         description: User's bio.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: location
 *         description: User's location.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: looking_for_job
 *         description: User's looking for job status.
 *         in: formData
 *         required: true
 *         type: boolean
 *     responses:
 *      200:
 *        description: "User created"
 *      422:
 *        description: "Validation error"
 */
router.post('/user', upload.single('avatar'), registerController.validate, registerController.register);

/**
 * @swagger
 *
 * /user:
 *   get:
 *     tags:
 *       - user
 *     summary: Get user's profile and full info
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: "Success"
 *      500:
 *        description: "Error fetching user profile"
 *     security:
 *      - bearer-auth: []
 */
router.get('/user', passport.authenticated, userController.show);

/**
 * @swagger
 *
 * /user:
 *   put:
 *     tags:
 *       - user
 *     summary: Update user's profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: firstname
 *         description: User's first name.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: lastname
 *         description: User's last name.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: avatar
 *         description: User's avatar.
 *         in: formData
 *         required: false
 *         type: file
 *       - name: age
 *         description: User's age.
 *         in: formData
 *         required: false
 *         type: integer
 *       - name: phone
 *         description: User's phone.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: technology
 *         description: Technologies that user knows.
 *         in: formData
 *         type: object
 *         properties:
 *          name:
 *            type: string
 *          level:
 *            type: string
 *       - name: github_link
 *         description: User's github link.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: bio
 *         description: User's bio.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: location
 *         description: User's location.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: looking_for_job
 *         description: User's looking for job status.
 *         in: formData
 *         required: false
 *         type: boolean
 *     responses:
 *      200:
 *        description: "User updated"
 *      500:
 *        description: "Error updating user profile"
 *     security:
 *      - bearer-auth: []
 */
router.put('/user', passport.authenticated, upload.single('avatar'), userController.update);

/**
 * @swagger
 *
 * /user/activate/{activation_id}:
 *   get:
 *     tags:
 *       - user
 *     summary: Activate user's account.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: activation_id
 *         description: User's personal activation string.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *        description: "Account activated."
 *      400:
 *        description: "Invalid activation string or account already activated."
 */
router.get('/user/activate/:activation_id', userController.activate);

/**
 * @swagger
 *
 * /user/login:
 *   post:
 *     tags:
 *       - user
 *     summary: Log in a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User's email.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *        description: "User logged in successfully. Token generated."
 *      401:
 *        description: "Incorrect email or password."
 *      403:
 *        description: "Account is not activated."
 *      422:
 *        description: "Validation error."
 *      500:
 *        description: "Internal server error."
 */
router.post('/user/login', loginController.validate, loginController.login);

/**
 * @swagger
 *
 * /user/vacancies:
 *   get:
 *     tags:
 *       - user
 *     summary: Get vacancies created by user
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: "Query OK."
 *      204:
 *        description: "No vacancies found."
 *      500:
 *        description: "Internal server error."
 *     security:
 *      - bearer-auth: []
 */
router.get('/user/vacancies', passport.authenticated, userController.createdVacancies);


/**
 * @swagger
 *
 * /vacancy:
 *   post:
 *     tags:
 *       - vacancy
 *     summary: Create new vacancy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: header
 *         description: Header of vacancy.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: body
 *         description: Body text of vacancy.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: logo
 *         description: Logo of vacancy.
 *         in: formData
 *         required: false
 *         type: file
 *       - name: location
 *         description: Location of vacancy.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Vacancy contact email.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: experience_required
 *         description: experience required.
 *         in: formData
 *         required: true
 *         type: boolean
 *       - name: technology
 *         description: Technologies that vacancy requires.
 *         in: formData
 *         type: object
 *         properties:
 *          name:
 *            type: string
 *          level:
 *            type: string
 *     responses:
 *      200:
 *        description: "Vacancy created."
 *      500:
 *        description: "Internal server error."
 *     security:
 *      - bearer-auth: []
 */
router.post('/vacancy', passport.authenticated, upload.single('logo'), vacancyController.store);

/**
 * @swagger
 *
 * /vacancy:
 *   get:
 *     tags:
 *       - vacancy
 *     summary: Show all vacancies
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: "Query OK."
 *      500:
 *        description: "Internal server error."
 *     security:
 *      - bearer-auth: []
 */
router.get('/vacancy', passport.authenticated, vacancyController.index);

/**
 * @swagger
 *
 * /vacancy/{id}:
 *   get:
 *     tags:
 *       - vacancy
 *     summary: Get vacancy by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Vacancy ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *        description: "Vacancy created."
 *      422:
 *        description: "No vacancy with such id found."
 *     security:
 *      - bearer-auth: []
 */
router.get('/vacancy/:id', passport.authenticated, vacancyController.show);

/**
 * @swagger
 *
 * /vacancy/{id}:
 *   put:
 *     tags:
 *       - vacancy
 *     summary: Update vacancy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Vacancy ID.
 *         in: path
 *         required: true
 *         type: string
 *       - name: header
 *         description: Header of vacancy.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: body
 *         description: Body text of vacancy.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: logo
 *         description: Logo of vacancy.
 *         in: formData
 *         required: false
 *         type: file
 *       - name: location
 *         description: Location of vacancy.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: email
 *         description: Vacancy contact email.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: experience_required
 *         description: experience required.
 *         in: formData
 *         required: false
 *         type: boolean
 *       - name: technology
 *         description: Technologies that vacancy requires.
 *         in: formData
 *         type: object
 *         properties:
 *          name:
 *            type: string
 *          level:
 *            type: string
 *     responses:
 *      200:
 *        description: "Vacancy created."
 *      400:
 *        description: "Vacancy with such id not found."
 *      401:
 *        description: "Unauthorized."
 *      500:
 *        description: "Error updating vacancy."
 *     security:
 *      - bearer-auth: []
 */
router.put('/vacancy/:id', passport.authenticated, upload.single('logo'), vacancyController.update);

/**
 * @swagger
 *
 * /vacancy/{id}:
 *   delete:
 *     tags:
 *       - vacancy
 *     summary: Removes vacancy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Vacancy ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *      204:
 *        description: "Vacancy removed."
 *      401:
 *        description: "Unauthorized."
 *      422:
 *        description: "Invalid vacancy id."
 *      500:
 *        description: "Internal server error."
 *     security:
 *      - bearer-auth: []
 */
router.delete('/vacancy/:id', passport.authenticated, vacancyController.remove);

/**
 * @swagger
 *
 * /technology:
 *   get:
 *     tags:
 *       - technology
 *     summary: Show all technologies
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: "Query OK."
 *      500:
 *        description: "Internal server error."
 *     security:
 *      - bearer-auth: []
 */
router.get('/technology', passport.authenticated, technologyController.index);



/* Routes to seed mongo database */
router.get('/seed/technologies/up', technologySeeder.up);
router.get('/seed/technologies/down', technologySeeder.down);


module.exports = router;
