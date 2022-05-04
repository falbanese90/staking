import { Staked, Stake_Store } from "../models/staked";
import express, { Request, Response } from 'express';

const store = new Stake_Store();

const index = async (req: Request, res: Response) => {
    try {
        const result = await store.index();
        res.send(result);
    } catch(err) {
        res.send(`${err}`)
    }
}

const add = async (req: Request, res: Response) => {
    try {
        const pub: Staked = {
            public_key: req.body.public_key
        }
        const result = await store.add(pub);
        res.send(result)
    } catch(err) {
        res.send(`${err}`);
    }
}

const staked_store_routes = (app: express.Application) => {
    app.get('/staked', index)
    app.post('/staked/add', add);
}

export default staked_store_routes;