var express = require('express');
var router = express.Router();
const UsersController = require("../Controllers/UsersController")

const controller = new UsersController() 

router.get('/',controller.getAllUsers )
router.post('/postUser',controller.saveUsers)
router.get('/:id',controller.getUserById)
router.delete('/delete/:id',controller.deleteById)
router.put('/update/:id',controller.updateById)



module.exports = router;
