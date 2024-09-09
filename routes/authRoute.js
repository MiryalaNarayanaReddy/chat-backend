const express = require('express')
const authRouter = express();

authRouter.post('signup',signup);
authRouter.get('login',login);

export default authRouter;
