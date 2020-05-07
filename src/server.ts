import App from './app';
// env variables
import { ENV } from './utils/env';
// controllers
import ControllersArray from './controllers';
// middlewares
import MiddlewaresArray from './middlewares';

const app = new App({
    env: ENV,
    middlewares: MiddlewaresArray,
    controllers: ControllersArray,
});

app.listen();