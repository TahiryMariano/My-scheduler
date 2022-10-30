import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "./entity/Task"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "SchedulerDB",
    synchronize: true,
    logging: false,
    entities: [User, Task],
    migrations: [],
    subscribers: [],
})
