import express, { Application } from 'express';
import mongoose from 'mongoose';

class App {

    public express: Application;
    public port: number;

    public constructor(appConfig: {
        env: any,
        middlewares: any,
        controllers: any,
    }) {

        this.express = express();

        this.port = appConfig.env.port;
        
        this.database(appConfig.env.database);

        this.middlewares(appConfig.middlewares);

        this.controllers(appConfig.controllers);
    }

    public listen() {
        this.express.listen(this.port, () => {
            console.log(`Express server has been started on port ${this.port}`);
        });
    }

    private middlewares(middlewares: {
        forEach: (mid: (midleware: any) => void) => void; 
    }): void {
        middlewares.forEach(middleware => {
            this.express.use(middleware);
        })
    }

    private controllers(controllers: {
        forEach: (con: (controller: any) => void) => void; 
    }): void {
        controllers.forEach(controller => {
            this.express.use('/api/', controller.router);
        })
    }

    private database(database: any): void {
        mongoose.connect(
            database.connection,
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true
            },    
            () => console.log('Connected to MongoDB')
        );
    }
}


export default App;
