import express from 'express';
import route from './routes/route.js';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import sequelize from './db/connection.js';
import session from 'cookie-session';
const app=express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

console.log("path",path.resolve()+'/src/views')
app.use(expressLayouts);
app.set('views', path.join(path.resolve(), 'src/views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded());
const PORT=8000;

const dbConnectionOk=async()=>{
    try {
        //await sequelize.sync({force:true})
        await sequelize.sync()
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

app.use(route);

const init = async()=>{
   await dbConnectionOk();
    app.listen(PORT,()=>console.log("Server is running on port "+PORT));
}

init();
