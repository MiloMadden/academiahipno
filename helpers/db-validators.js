const Student = require('../models/student')
const Role = require('../models/role')

const emailExiste = async(email)=>{

    const emailExiste = await Student.findOne({email})
    if(emailExiste){
        throw new Error(`Ya existe un estudiante registrado con el correo ${email}`)
    }

}

const roleExiste = async(role)=>{

    const roleExiste = await Role.findOne({role})

    //console.log(roleExiste)
    if(!roleExiste){
        throw new Error(`${role} no es un rol valido`)  
    }

    if(roleExiste.role !== 'STUDENT'){
        throw new Error(`${role} no es un rol valido`) 
    }
}

const emailExisteLogin = async(email)=>{

    const emailExisteLogin = await Student.findOne({email})

    if(!emailExisteLogin){
        throw new Error(`No existe un estudiante con el correo ${email}`)
    }

}


module.exports = {
    emailExiste, 
    roleExiste, 
    emailExisteLogin
}