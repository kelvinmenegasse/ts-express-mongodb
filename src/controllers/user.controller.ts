import express from 'express';
import UserService from '../services/user.service';

class UserController {

    public router = express.Router();
    public path = '/user';
    
    constructor() {
        this.routes();
    }

    public routes() {
        this.router.post(`${this.path}`, UserService.index );
        this.router.post(`${this.path}/create`, UserService.create );
        this.router.post(`${this.path}/login`, UserService.login );
    }

}

export default new UserController();