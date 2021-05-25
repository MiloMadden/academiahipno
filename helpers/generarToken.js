const jwt = require('jsonwebtoken')

const generarToken = (uid)=>{

    return new Promise((resolve, reject)=>{

        const payload = {uid} 
        
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