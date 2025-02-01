function addHandlers(app, userDao) {
    app.post('/users', async (req, res) => {
        const user = req.body;
        const response = await userDao.addUser(user);
    
        res.status(response.status).json(response.body);
    });
    
    app.get('/users', async (req, res) => {
      const response = await userDao.getUsers();
    
      return res.status(response.status).json(response.body);
    });
    
    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const response = await userDao.getUser(id);
    
      res.status(response.status).json(response.body);
    });
    
    app.put('/users/:id', async (req, res) => {
        const id = req.params.id;
        const user = req.body;
        const response = await userDao.updateUser(id, user);
    
        res.status(response.status).json(response.body);
    });
    
    app.delete('/users/:id', async (req, res) => {
        const id = req.params.id;
        const response = await userDao.deleteUser(id);
        
        res.status(response.status).json(response.body);
    });
}

module.exports = {addHandlers};