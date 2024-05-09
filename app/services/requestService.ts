import Joi from 'joi'; // also has the class-validator

// can also be done manually with case or if's

export class RequestService {
    static validateCustomerData(data: any) {
        const schema = Joi.object({
            name: Joi.string().required(),
            type: Joi.string().valid('PERSON', 'COMPANY').required(),
            cpf: Joi.string().when('type', { is: 'PERSON', then: Joi.string().required() }),
            cnpj: Joi.string().when('type', { is: 'COMPANY', then: Joi.string().required() }),
            dateOfBirth: Joi.date().iso().required(),
            street: Joi.string().required(),
            streetNumber: Joi.string().required(),
            cep: Joi.string().required(),
            district: Joi.string().required(),
            city: Joi.string().required(),
        });

        return schema.validate(data);
    }

    static validateRouterData(data: any) {
        const schema = Joi.object({
            IPv4: Joi.string().required(),
            IPv6: Joi.string().required(),
            brand: Joi.string().required(),
            model: Joi.string().required(),
        });

        return schema.validate(data);
    }
}
