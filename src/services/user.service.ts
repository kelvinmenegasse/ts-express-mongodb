import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../schemas/User';
import userValidation from '../validators/user.validation';

class UserService {
    
    public async index (req: Request, res: Response): Promise<Response> {
        
        const users = await User.find();

        return res.json({ users });
    }

    public async create (req: Request, res: Response): Promise<Response> {

        // Validate The Data Before Add
        const { error } = userValidation.registerValidation(req.body);
        
        if (error) return res.status(400).json(error.details[0].message);
    
        // Checking if the email is already in the database
        const emailExist = await User.findOne({ email: req.body.email });
    
        if (emailExist) return res.status(400).json('O email informado já existe');
    
        // Hash the Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
    
        // Create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });
    
        try {

            const savedUser = await user.save();
            
            return res.json(savedUser);

        } catch (error) {

            return res.status(400).json(error);

        }
    }

    public async login (req: Request, res: Response): Promise<Response> {
        // Validate The Data Before Add
        const { error } = userValidation.loginValidation(req.body);
        
        if (error) return res.status(400).json(error.details[0].message);
    
        // Checking if the email is already in the database
        const user = await User.findOne({ email: req.body.email });
    
        if (!user) return res.status(400).json('Usuário ou senha incorretos');
    
        // Checking password
        const validPass = await bcrypt.compare(req.body.password, user.password as string);
    
        if (!validPass) return res.status(400).json('Usuário ou senha incorretos');
    
        // Create and asign a Token
        const token = jwt.sign({ _id: user._id }, process.env.JWTOKEN_SECRET as string);
    
        return res.header('auth-token', token).json(token);
    }

}

    
export default new UserService();