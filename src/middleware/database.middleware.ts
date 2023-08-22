import { Pool } from 'pg';
import { IPool } from '@/utils/interfaces/database.interface';
import HttpException from '@/utils/exceptions/http.exception';

class Database {
    public pool: Pool | undefined;

    private POSTGRES_USER = process.env.POSTGRES_USER!;
    private POSTGRES_HOST = process.env.POSTGRES_HOST!;
    private POSTGRES_DB = process.env.POSTGRES_DB!;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD!;
    private POSTGRES_PORT = process.env.POSTGRES_PORT!;

    constructor() {
        this.connectToPostgreSQL();
    }

    private async connectToPostgreSQL() {
        try {
            const dbConfig: IPool = {
                user: this.POSTGRES_USER,
                host: this.POSTGRES_HOST,
                database: this.POSTGRES_DB,
                password: this.POSTGRES_PASSWORD,
                port: parseInt(this.POSTGRES_PORT)
            }
            this.pool = new Pool(dbConfig);
            this.pool.on('connect', () => {
                console.log("PostgreSQL connection has been established successfully.");
            });
        } catch (err: any) {
            throw new HttpException(400, err.message);
        }
    }
}

export default Database;