const express = require('express')
const cors = require('cors')
const {dbConnection} = require('../database/config')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // database
        this.connectDB()

        // middlewares
        this.middlewares()

        this.app.set('view engine', 'ejs')
        // router
        this.routes()
    }

    middlewares(){
        this.app.use( cors() )
        this.app.use( express.json() )
        this.app.use( express.static('public') )
    }

    connectDB(){
        dbConnection()
    }

    routes(){
        this.app.use('/api/students', require('../routes/students'))
        this.app.get('*', function(req, res){
            res.status(404).render('404');
        });
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`app running in port ${this.port}`)
        })
    }

}

module.exports = Server