var express = require('express');
var router = express.Router();
var registerController = require('../controllers/RegisterController');
var loginController = require('../controllers/LoginController');
var userController = require('../controllers/UserController');
const passport = require('../passport');

/**
 * @swagger
 *
 * /user/activate/{activation_id}:
 *   get:
 *     tags:
 *       - user
 *     description: Activate user's account.
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
 *     description: Log in a user
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
 * /user:
 *   post:
 *     tags:
 *       - user
 *     description: Create new user
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
 *     responses:
 *      200:
 *        description: "User created"
 *      422:
 *        description: "Validation error"
 */
router.post('/user', registerController.validate, registerController.register);


module.exports = router;
