

import { User } from '../../common/types/user.type';
export class AuthenticationService {
    
    private users: User[];

    constructor() {
        this.users = [{username: 'member', password: process.env['BASIC_PASSWORD'] || 'start1'}];
        console.log('blup', this.users)
    }
    // blup

    public async authenticate(iUser: User) {
        const user = this.users.find(u => u.username === iUser.username && u.password === iUser.password);
        console.log('xxxx', iUser, user, this.users)
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }

    public basicAuth = async (req: any, res: any, next: any) => {
        // check for basic auth header
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({ message: 'Missing Authorization Header' });
        }
     
        // verify auth credentials
        const base64Credentials =  req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        const user = await this.authenticate({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Authentication Credentials' });
        }
    
        // attach user to request object
        req.user = user
    
        next();
    } 
}