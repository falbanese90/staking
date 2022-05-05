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

const del = async (req: Request, res: Response) => {
    try {
        const pub: Staked = {
            public_key: req.params.public_key
        }
        const result = await store.delete(pub);
    } catch(err) {
        res.send(`${err}`);
    }
}
const select = async (req: Request, res: Response) => {
    try {
        const pub: Staked = {
            public_key: req.params.public_key
        }
        const result = await store.select(pub);
        res.send(result);
    } catch(err) {
        res.send(`${err}`);
    }
}
const getTime = async (req: Request, res: Response) => {
    try {
        const pub: string = req.params.public_key;
        const result = await store.getTime(pub);
        res.send(result);
    } catch(err) {
        res.send(`${err}`);
    }
}

const staked_store_routes = (app: express.Application) => {
    app.get('/staked', index)
    app.post('/staked/add', add);
    app.delete('/staked/delete/:public_key', del);
    app.get('/staked/select/:public_key', select)
    app.get('/staked/time/:public_key', getTime);
}

export default staked_store_routes;