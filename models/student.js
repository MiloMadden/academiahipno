const {Schema, model} = require('mongoose')

const studentSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }, 
    email: {
        type: String, 
        required: [true, 'Inserta un correo válido']
    }, 
    role: {
        type: String, 
        enum: ['STUDENT', 'TEACHER', 'PAPU'], 
        required: true,
        default: 'STUDENT'
    }, 
    password: {
        type: String, 
        required: [true, 'La contraseña es obligatoria']
    }

})

studentSchema.methods.toJSON = function(){
    const {__v, password, ...data} = this.toObject() 
    return data
}

module.exports = model('Student', studentSchema)