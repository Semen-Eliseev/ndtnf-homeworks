import express, { Request, Response, Router } from 'express';
import { render } from 'ejs';

const indexRouter = Router();

indexRouter.get('/', (req: Request, res: Response) => {
    res.render('index', {
        title: 'Главная',
    })
});

export default indexRouter;
