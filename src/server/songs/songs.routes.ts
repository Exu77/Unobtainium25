import { GoogleApiHelper } from './../googleApi/google-api-helper';
import { AuthenticationConstants } from './../../common/constants/authentication.constants';
import express from "express";
import SongsService from './songs.service';

export class SongsRoutes {    
  public static initRoutes(app: express.Application, googleApiHelper: GoogleApiHelper) {
        const songService: SongsService = new SongsService(googleApiHelper); 

        // TODO: the Alphatab can't really load files behind the securty as the interceptor does not work
        // otherwise it should be secured 
        app.get(`/${AuthenticationConstants.URL_API_OPEN}/googleDrive/fileContent`, function (req, res) {
          googleApiHelper.streamFileContent(req.query['id'] as string)
              .then((response: any) => {
                response.data.pipe(res);
              })
              .catch(error => {
                res.status(error.statusCode).send(error.toString());
              });
          });

          app.get(`/${AuthenticationConstants.URL_API_SECURE}/googleDrive/songFolders`, function (req, res) {
            songService.getSongFolders()
              .then(songFolders => res.json(songFolders))
              .catch(error => {
                res.status(error.statusCode).send(error.toString());
              });
          });

          app.get(`/${AuthenticationConstants.URL_API_SECURE}/googleDrive/rootFolder`, function (req, res) {
            songService.getRootFolder()
              .then(song => res.json(song))
              .catch(error => {
                res.status(error.statusCode).send(error.toString());
              })
              ;
          });
          
          app.get(`/${AuthenticationConstants.URL_API_SECURE}/googleDrive/song`, function (req, res) {
            songService.getSongFiles(req.query['name'] as string, null)
              .then(song => res.json(song))
              .catch(error => {
                res.status(error.statusCode).send(error.toString());
              })
              ;
          });
    }
}