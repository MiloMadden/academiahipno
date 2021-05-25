const Student = require('../models/student')
const bcrypt = require('bcrypt')
const {generarToken} = require('../helpers/generarToken')

const getStudents = (req, res)=>{
    res.json({
        ok: true,
        msg: 'Working'
    })
}

const postStudent = async(req, res)=>{

    const {name, email, password} = req.body 
    
    const student = new Student({
        name, 
        email, 
        password
    })

    const salt = bcrypt.genSaltSync(10)

    student.password = bcrypt.hashSync(password.toString(), salt)

    try {

        const studentDB = await student.save()

        res.json({
            ok: true, 
            student: studentDB
        })
        
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }

}
//==================================================
const loginStudent = async(req, res)=>{
    
    const {email, password} = req.body

    try {
        
        const student = await Student.findOne({email})

        if(!student){
            return res.status(400).json({
                ok: false,
                msg: `No existe ningun estudiante registrado con el correo: ${email}`
            })
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, student.password)

        if(!validPassword){
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }

        // generar jwt
        const token = await generarToken(student._id)

        res.json({
            ok: true,
            student,
            token
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}
//==================================================
module.exports = {
    getStudents, 
    postStudent, 
    loginStudent
}