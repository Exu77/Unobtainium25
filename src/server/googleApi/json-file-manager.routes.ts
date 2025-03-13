import { GoogleApiHelper } from './google-api-helper';
import { AuthenticationConstants } from '../../common/constants/authentication.constants';
import express from "express";
import { JsonFileManager } from './json-file-manager';

export class JsonFileManagerRoutes { 

    public static initRoutes(app: express.Application, googleApiHelper: GoogleApiHelper, fileName: string, routeName: string) {
        const jsonService = new JsonFileManager(googleApiHelper, fileName);

        app.get(`/${AuthenticationConstants.URL_API_SECURE}/${routeName}/getAll`, function (req, res) {
            jsonService.getAll()
            .then((response: any) => {
                return res.json(response);
            //response.data.pipe(res);
            })
            .catch(error => {
            res.status(error.statusCode).send(error.toString());
            });
        });

        app.post(`/${AuthenticationConstants.URL_API_SECURE}/${routeName}`, function (req, res, next) {
            jsonService.save(req.body)
                  .then(todoList => {
                    return res.json(todoList);
                  }).catch(err => next(err));
        });

        app.delete(`/${AuthenticationConstants.URL_API_SECURE}/${routeName}/:id`, function (req, res, next) {
            jsonService.delete(req.params.id)
                  .then(todoList => {
                    return res.json(todoList);
                  }).catch(err => next(err));
        });
    }
}