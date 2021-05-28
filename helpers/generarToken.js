const jwt = require('jsonwebtoken')

const generarToken = (student)=>{

    return new Promise((resolve, reject)=>{

        const payload = student
        
        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '60d'
        }, (err, token)=>{

            if(err){
                console.log(err)
                reject('No se pudo generar token')
            }else{
                resolve(token)
            }

        })

    })
}

module.exports = {
    generarToken
}