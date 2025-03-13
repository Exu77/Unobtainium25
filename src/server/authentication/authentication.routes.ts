import { AuthenticationConstants } from './../../common/constants/authentication.constants';
import { AuthenticationService } from './authentication.service';
import express from "express";

export class AuthenticationRoutes {
    public static initRoutes(app: express.Application) {
        const authService = new AuthenticationService();
        // init the security for all routes that start with the api_secure url
        app.use(AuthenticationConstants.URL_API_SECURE, authService.basicAuth);

        app.post(`/${AuthenticationConstants.URL_API_OPEN}/authenticate`, function (req, res, next) {
          authService.authenticate(req.body)
                .then(user => {
                  if (user) {
                    res.json(user);
                  } else {
                    res.status(400).json({ message: 'Password is incorrect' });
                  }
                }).catch(err => next(err));
        });
    }
}