import Joi from '@hapi/joi';

class UserValidation {

     registerValidation(data: any) {

        const schema: Joi.ObjectSchema = Joi.object({
            name: Joi
                    .string()
                    .min(6)
                    .required(),
            email: Joi
                    .string()
                    .min(6)
                    .required()
                    .email(),
            password: Joi
                    .string()
                    .min(6)
                    .required(),
        });
    
        return schema.validate(data);
    }
    
    loginValidation(data: any) {
        const schema: Joi.ObjectSchema = Joi.object({
            email: Joi
                    .string()
                    .min(6)
                    .email()
                    .required(),
            password: Joi
                    .string()
                    .min(6)
                    .required(),
        });
    
        return schema.validate(data);
    }
}

export default new UserValidation();