import { Request, Response } from 'express';


const myMiddleware = (req: Request, res: Response, next: any) => {
    console.log('my middleware');
    next();
}

export default myMiddleware;


