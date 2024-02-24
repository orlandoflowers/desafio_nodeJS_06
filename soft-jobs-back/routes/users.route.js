import { Router } from 'express';
import { usersController } from '../controllers/user.controller.js';
import { verifyCredentials, verifyToken } from '../middlewares/users.middleware.js';


// Router
const router = Router();

// get users
router.get('/usuarios', verifyToken, usersController.getUser);


router.post('/usuarios', usersController.registrarUsuario);
router.post('/login', verifyCredentials, usersController.login);

// Error 404
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;
