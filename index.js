import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import mechanicRoutes from './router/mechanicRoutes.js'
import servicesRoutes from './router/servicesRoutes.js'
import reviewRoutes from './router/reviewsRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use (cors());
app.use(express.json());

app.use('/img', express.static(path.resolve(__dirname, 'public/images')));

const PORT = process.env.PORT || 8080;

app.use('/api/reviews', reviewRoutes);
app.use('/api/mechanics', mechanicRoutes);
app.use('/api/services', servicesRoutes);



app.listen(PORT, () => {
    
})