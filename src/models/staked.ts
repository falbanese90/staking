import Client from "../database";

export type Staked = {
    id?: number;
    t?: Date;
    public_key: string;
}

export class Stake_Store {
    async index(): Promise<Staked[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM staked';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async add(pub: Staked): Promise<Staked> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO staked(public_key) VALUES($1) RETURNING *';
            const result = await conn.query(sql, [pub.public_key]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async delete(pub:Staked): Promise<void> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM staked WHERE public_key=($1)';
            const result = await conn.query(sql, [pub.public_key]);
            conn.release();
        } catch(err) {
            throw new Error(`${err}`);
        }
    }
    async select(pub: Staked): Promise<Staked[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM staked WHERE public_key=($1)';
            const result = await conn.query(sql, [pub.public_key]);
            conn.release();
            return result.rows
        } catch(err) {
            throw new Error(`${err}`);
        }
    }
    async getTime(pub: string): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT t FROM staked WHERE public_key=($1)';
            const result = conn.query(sql, [pub]);
            conn.release();
            return (await result).rows[0];
        } catch(err) {
            throw new Error(`${err}`);
        }
    }
}