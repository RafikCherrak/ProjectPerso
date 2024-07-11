
import publicRoutes from "./routes/public/public"
import express, { Application } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}!`);
        });


app.use("/api/", publicRoutes)
