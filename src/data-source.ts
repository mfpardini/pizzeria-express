import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "MySql!",
    database: "db_pizzeria",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    insecureAuth: true,
})
