import "reflect-metadata"
import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "MySql!",
    database: "db_pizzeria",
    synchronize: true,
    logging: false,
    entities: [__dirname + "/entity/*{.js,.ts}"],
    migrations: [__dirname + "/migration/*{.js,.ts}"],
    subscribers: [],
    // dropSchema: true,
    namingStrategy: new SnakeNamingStrategy(),
})
