import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import authenticateToken from '../middlewares/auth.middleware';

export class UserRoutes {

    private userController: UserController = new UserController();

    public route(app: Application) {
        
        app.post('/api/user', (req: Request, res: Response) => {
            this.userController.createUser(req, res);
        });
        
        app.post('/api/user/sign-in', (req: Request, res: Response) => {
            this.userController.signIn(req, res);
        });

        app.get('/api/user',authenticateToken , (req: Request, res: Response) => {
            this.userController.getAllUsers(req, res);
        });

        app.get('/api/user/:id', (req: Request, res: Response) => {
            this.userController.getUser(req, res);
        });

        app.put('/api/user/:id', authenticateToken, (req: Request, res: Response) => {
            this.userController.updateUser(req, res);
        });

        app.delete('/api/user/:id', authenticateToken, (req: Request, res: Response) => {
            this.userController.deleteUser(req, res);
        });

    }
}