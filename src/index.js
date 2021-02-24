const express = require("express");
//morgan la inicializar servidor al actualizar
const morgan = require('morgan');
//Path para obtener direccion facilmente
const path = require('path');
const app = express();
const { mongoose } = require('./database')

//Settings 
app.set('port', process.env.PORT || 3000);

/*-- Middlewares --*/
app.use(morgan('dev'));
//convers to json
app.use(express.json());


//Routes define
app.use('/api/tasks', require('./routes/task.routes'))


//Static files index.html
app.use(express.static(path.join(__dirname, 'public')));


//Start the servers
app.listen(app.get('port'), () => {
    console.log(`Serve on port ${app.get('port')}`);
});