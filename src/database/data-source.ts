import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "MySql!",
    database: "db_pizzeria",
    synchronize: false,
    logging: true,
    entities: [__dirname + "/../entity/*{.js,.ts}"],
    // migrations: [__dirname + "/database/**/*{.js,.ts}"],
    subscribers: [],
    // dropSchema: true,
    namingStrategy: new SnakeNamingStrategy(),
});

export const connectToDb = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
};
