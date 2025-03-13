import { ObjectWithid } from '../../common/types/object-with-id.type';
import { GoogleFileType } from './googleFileType.model';
import { Todo } from '../../common/types/todo.type';
import { GoogleApiHelper } from './google-api-helper';
const { ErrorHandler } = require('./../error.handler')
const { 
    v4: uuidv4,
  } = require('uuid');
export class JsonFileManager {
    private googleApiHelper: GoogleApiHelper;
    private googleDrive: any;
    private jsonFileId: string = '';

    private readonly jsonFileName: string;

    constructor(
        googleApiHelper: GoogleApiHelper,
        fileName: string,
    ) {
        this.googleApiHelper = googleApiHelper;
        this.googleDrive = this.googleApiHelper.googleDrive;
        this.jsonFileName = fileName;
        this.getFileId().then((dummy) => {
            console.log(`JsonFileManager Initialized: ${this.jsonFileName} = ${this.jsonFileId}`)
        })
    }

    public async getAll(): Promise<ObjectWithid[]> {
        let result: ObjectWithid[] = [];
        const tempResult = await this.googleApiHelper.getTextFileAsString(this.jsonFileId);
        result = JSON.parse(tempResult) as ObjectWithid[];
        return result;
    }

    public async save(inputObj: Todo): Promise<ObjectWithid[]> {
        if (!inputObj) {
            throw new Error('Object is empty');
        }
        const objectList = await this.getAll();
        if (!inputObj.id) {
            inputObj.id = uuidv4();
        }

        const listIdx = this.getObjectListIndex(objectList, inputObj.id);
        if (listIdx === -1) {
            objectList.push(inputObj);
        } else {
            objectList.splice(listIdx, 1, inputObj);
        }

        await this.uploadFile(objectList);

        return objectList;
    }

    public async delete(theId: string): Promise<ObjectWithid[]> {
        const objList = await this.getAll();
        const listIdx = this.getObjectListIndex(objList, theId);
        if (listIdx === -1) {
            throw new Error('No Todo with id found');
        } else {
            objList.splice(listIdx, 1);
        }

        await this.uploadFile(objList);

        return objList;
    }

    private async addFile(): Promise<string> {
        var fileMetadata = {
            'name' : this.jsonFileName,
            'mimeType' : GoogleFileType.JSON,
            'parents': [this.googleApiHelper.rootFolder]
          };
        return await this.googleDrive.files.create({
            resource: fileMetadata,
        }).then((response: any) => {
            console.log('trying to add the file ', fileMetadata, response.data);
            return response?.data?.id as String;
        });
    }

    private async getFileId(): Promise<void> {
        if (this.jsonFileId) return;

        let queryString =  `'${this.googleApiHelper.rootFolder}' in parents and name = '${this.jsonFileName}'`;
        try {
            const tempResult = await this.googleDrive.files.list({
                q: queryString, 
                fields: 'files/name, files/id',
                orderBy: 'name'
              } );
  
            if(tempResult?.data?.files && tempResult?.data?.files[0]) { 
                this.jsonFileId = tempResult.data.files[0].id as string;
            }
          } catch (error) {
            throw new ErrorHandler(500, error);
          }
          if (!this.jsonFileId) {
            this.jsonFileId = await this.addFile();
            this.uploadFile([]);
        }
    }

        
    private getObjectListIndex(objList: ObjectWithid[], theId: string | undefined): number {
        return objList.findIndex(aObj => {
            return aObj.id === theId;
        });
    }

    private async uploadFile(objList: ObjectWithid[]) {
        await this.googleApiHelper.updateJsonFile(this.jsonFileId, objList);
    }
}