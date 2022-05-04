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
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async delete(pub:Staked): Promise<void> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM staked WHERE public_key=$1';
            const result = await conn.query(sql, [pub.public_key]);
        } catch(err) {
            throw new Error(`${err}`);
        }
    }
}