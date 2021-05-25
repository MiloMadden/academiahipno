const {Router} = require('express')
const {getStudents, postStudent, loginStudent} = require('../controllers/students')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validarCampos')
const {emailExiste, roleExiste, emailExisteLogin} = require('../helpers/db-validators')
const router = Router()

router.get('/', getStudents)
router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(), 
    check('email', 'Inserta un correo valido').isEmail(),
    check('email').custom(email=> emailExiste(email)),
    check('role').custom(role=>roleExiste(role)),
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({min: 6}),
    validarCampos
], postStudent)

router.post('/login', [
    check('email', 'Inserta un correo').not().isEmpty(), 
    check('email', 'Inserta un correo valido').isEmail(),
    check('email').custom(emailExisteLogin),
    check('password', 'Inserta tu contraseña').not().isEmpty(),
    validarCampos
], loginStudent)

module.exports = router