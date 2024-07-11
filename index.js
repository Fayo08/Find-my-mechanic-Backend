import express from 'express';
import cors from 'cors'
import mechanicRoutes from './router/mechanicRoutes.js'

const app = express();

app.use (cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use('/', mechanicRoutes);

app.listen(PORT, () => {
    
})