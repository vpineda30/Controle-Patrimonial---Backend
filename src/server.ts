import Express from "express";
import { UserHandler } from "./modules/User/handlers/user.handler";
import { authMiddleware } from "./middlewares/user.middleware";

const app = Express();
const handler = new UserHandler();

app.use(Express.json());

app.post('/login', (req, res) => handler.loginUser(req, res));
app.post('/register', (req, res) => handler.createUser(req, res));
app.post('/forgot-password', (req, res) => handler.forgotPassword(req, res));
app.post('/update-password', (req, res) => handler.updatePassword(req, res));
app.get('/test', authMiddleware, (req, res) => res.json({ message: "Hello World" }));

app.listen(3030, () => console.log("Server is running on port 3030")); 