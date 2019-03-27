var express = require('express');
var router = express.Router();
var user = require('../controllers/UsersController');


router.get('/user/:id', user.getById);


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
router.post('/user', user.registerValidate, user.register);


module.exports = router;
