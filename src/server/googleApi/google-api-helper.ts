import { GoogleFileType } from './googleFileType.model';
const stream = require('stream');
const {google} = require('googleapis');
const fs = require('fs');

export class GoogleApiHelper {
    public googleDrive: any;

    public readonly rootFolder = '1Y9uRzpaVyJK8gKHci1lifSwY8SCvkg9J';
    private readonly scopes = ['https://www.googleapis.com/auth/drive'];
    private googleAuth: any;
    constructor() {
        // somehow we need other linefeeds then it is delivered from the .env
        const privateKey = process.env['GAPI_PRIVATE_KEY']?.replace(/\\n/g, '\n');
        this.googleAuth = new google.auth.JWT(
            process.env['GAPI_CLIENT_EMAIL'], null,
            privateKey, this.scopes,
        );
        this.googleDrive = google.drive({ version: "v3", auth: this.googleAuth });
    }

    public async streamFileContent(id: string): Promise<any> {
        // Tried to cache it but it didn't work
        const result = await this.googleDrive.files.get({
          fileId: id,
          alt: 'media',
        }, { responseType: 'stream' })
  
        return result;
      }

      public async getTextFileAsString(id: string): Promise<string> {
        // Tried to cache it but it didn't work
        return new Promise((resolve, reject) => {
            this.googleDrive.files.get(
                {fileId: id, alt: "media",},
                {responseType: "stream"},
                // @ts-ignore
                (err: any, { data }) => {
                  if (err) {
                    console.error('error first', err);
                    reject('error first');
                  }
                  const buf: any[] = [];
                  data.on("data", (e: any) => buf.push(e));
                  data.on("end", () => {
                    const buffer = Buffer.concat(buf);
                    return resolve(buffer.toString('utf8'));
                  });
                }
              );
        });
      } 

      public async updateJsonFile(id: string, content: any): Promise<void> {
          const file = JSON.stringify(content);
          const buf = Buffer.from(file, 'binary');
          const buffer = Uint8Array.from(buf);
          var bufferStream = new stream.PassThrough();
          bufferStream.end(buffer);

          const media = {
            mimeType: GoogleFileType.JSON,
            body: bufferStream,
        };

          this.googleDrive.files.update({
            fileId: id,
            media: media,
            }, (err: any, res: any) => {
                if (err) {
                    console.error('update file', err);
                    return;
                }
            });
      }
}