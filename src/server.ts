/* import express, { Request, Response, Router } from 'express';
import router from './routes';


const app = express();
const route = Router();

app.use(express.json());
app.use('/api', router);

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' });
});

app.use(route);

app.listen(3333, () => console.log('server running on port 3333')); */

import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))