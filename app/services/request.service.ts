import Joi from 'joi'; // also has the class-validator
import { CustomerData, RouterData } from '../../public/services/api';

// can also be done manually with case or if's

export class RequestService {
    static validateCustomerData(data: CustomerData) {
        const schema = Joi.object({
            name: Joi.string().required(),
            type: Joi.string().valid('PERSON', 'COMPANY').required(),
            cpf: Joi.string()
                .pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
                .when('type', {
                    is: 'PERSON',
                    then: Joi.string()
                        .pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
                        .required(),
                }),
            cnpj: Joi.string()
                .pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
                .when('type', {
                    is: 'COMPANY',
                    then: Joi.string()
                        .pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
                        .required(),
                }),
            dateOfBirth: Joi.date().iso().required(),
            street: Joi.string().required(),
            streetNumber: Joi.string().required(),
            cep: Joi.string()
                .pattern(/^\d{5}-\d{3}$/)
                .required(),
            district: Joi.string().required(),
            city: Joi.string().required(),
        });

        return schema.validate(data);
    }

    static validateRouterData(data: RouterData) {
        const schema = Joi.object({
            IPv4: Joi.string()
                .regex(/^(\d{1,3}\.){3}\d{1,3}$/)
                .required(),
            IPv6: Joi.string()
                .regex(
                    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
                )
                .required(),
            brand: Joi.string().required(),
            model: Joi.string().required(),
        });

        return schema.validate(data);
    }
}
