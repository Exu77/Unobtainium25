declare module GoogleDrive {

    export interface LastModifyingUser {
        kind: string;
        displayName: string;
        photoLink: string;
        me: boolean;
        permissionId: string;
        emailAddress: string;
    }

    export interface Capabilities {
        canAddChildren: boolean;
        canAddMyDriveParent: boolean;
        canChangeCopyRequiresWriterPermission: boolean;
        canChangeViewersCanCopyContent: boolean;
        canComment: boolean;
        canCopy: boolean;
        canDelete: boolean;
        canDownload: boolean;
        canEdit: boolean;
        canListChildren: boolean;
        canModifyContent: boolean;
        canMoveChildrenWithinDrive: boolean;
        canMoveItemIntoTeamDrive: boolean;
        canMoveItemOutOfDrive: boolean;
        canMoveItemWithinDrive: boolean;
        canReadRevisions: boolean;
        canRemoveChildren: boolean;
        canRemoveMyDriveParent: boolean;
        canRename: boolean;
        canShare: boolean;
        canTrash: boolean;
        canUntrash: boolean;
    }

    export interface File {
        kind: string;
        id: string;
        name: string;
        mimeType: string;
        starred: boolean;
        trashed: boolean;
        explicitlyTrashed: boolean;
        parents: string[];
        spaces: string[];
        version: string;
        webViewLink: string;
        iconLink: string;
        hasThumbnail: boolean;
        thumbnailVersion: string;
        viewedByMe: boolean;
        createdTime: Date;
        modifiedTime: Date;
        modifiedByMe: boolean;
        owners: any[];
        lastModifyingUser: LastModifyingUser;
        shared: boolean;
        ownedByMe: boolean;
        capabilities: Capabilities;
        viewersCanCopyContent: boolean;
        copyRequiresWriterPermission: boolean;
        writersCanShare: boolean;
        permissions: any[];
        permissionIds: string[];
        folderColorRgb: string;
        quotaBytesUsed: string;
        isAppAuthorized: boolean;
    }

}