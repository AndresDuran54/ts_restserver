import express, {Application} from "express";
import userRoute from "../routes/usuario";
import cors from 'cors';

class Server{
    
    private app: Application;
    private port: String;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? '8080';

        //Métodos iniciales
        this.middlewares();

        this.routes();
        
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoute);
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura del body
        this.app.use(express.json());

        //Carpeta pública
        this.app.use( express.static('public') );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log("Servidor corriendo en puerto: "+this.port);
        });
    }
}

export default Server;