import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import { env } from "./config/env";
import { authenticateKey } from "./middleware/auth.middleware";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const PORT = env.port;
const app: Application = express();

app.use(express.json());
app.use('/api/v1/cars', authenticateKey, carRoutes);

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({ 
    message: "hello from Manny" 
    });
});

app.get('/bananas', async (_req : Request, res: Response) => {
    res.json({ 
    message: "this is bananas", 
    }); 
}); 

app.get('/apples', async (_req : Request, res: Response) => {
    res.json({ 
    message: "an apple a day keeps the doctor away", 
    }); 
}); 

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`); 
    next(); 
}); 

app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);


app.listen(PORT, () => { 
    console.log("Server is running on port", PORT); 
    });

