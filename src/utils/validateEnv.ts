import { cleanEnv, str, port, num } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        port: port({ default: 3000 }),
        POSTGRES_USER: str(),
        POSTGRES_HOST: str(),
        POSTGRES_DB: str(),
        POSTGRES_PASSWORD: str(),
        POSTGRES_PORT:num()
    })
}

export default validateEnv;