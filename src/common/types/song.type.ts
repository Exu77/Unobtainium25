export interface SongFolder {
    name: string;
    id: string;
}

export interface Song {
    title?: string;
    description?: string;
    imgUrl?: string;
    videoLinks?: string[];
    chordSheets?: SongFile[];
    tabs?: SongFile[];
    recordings?: SongFile[];
    folderId?: string;
}

export interface SongFile {
    id?: string;
    name?: string; 
    mimeType?: string;
    webViewLink?: string;
    iconLink?: string;
    modifiedTime?: string; 
    webContentLink?: string;
}