import { AppDataSource } from "./data-source"
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import indexRoutes from './routes/indexRoutes'

AppDataSource.initialize()
    .then(async () => {
        //create express app
        const app = express();

        //use bodyparser
        app.use(bodyParser.json())

        //use cors
        app.use(cors())

        //import routes
        app.use('/', indexRoutes)

        //Start express server
        app.listen(3000, () => console.log("Express server has started on port 3000"))

    })
    .catch(error => console.log(error))
