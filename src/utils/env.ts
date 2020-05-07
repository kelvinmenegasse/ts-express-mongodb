import * as dotenv from "dotenv";

export interface EnvInterface {
    port: string,
    database: {
        connection: string
    },
    jwt: {
        user_secret: string
    }
};


// DotEnv config
let path = `${__dirname}/../../.env`;

dotenv.config({ path: path });

export const ENV = {
    port: process.env.APP_PORT,
    database: {
        connection: process.env.DB_CONNECT
    },
    jwt: {
        user_secret: process.env.JWTOKEN_USER_SECRET
    }
}