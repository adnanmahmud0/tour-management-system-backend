import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
    PORT: string;
    MONGODB_URI: string;
    NODE_ENV: "development" | "production" | "test";
}

const loadEnvVars = (): EnvConfig => {
    const requiredEnvVars: string[] = ['PORT', 'MONGODB_URI', 'NODE_ENV'];

    requiredEnvVars.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Environment variable ${key} is not defined`);
        }
    })

    return {
        PORT: process.env.PORT as string,
        MONGODB_URI: process.env.MONGODB_URI as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test"
    }

}

export const envVars = loadEnvVars();