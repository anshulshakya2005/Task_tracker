const { createtask,getalltask,updatetask,deletetask } = require('../Controllers/taskcontroller');

const router = require('express').Router();

router.get('/', getalltask)

router.post('/create', createtask);

router.put('/update/:id', updatetask);
router.delete('/delete/:id', deletetask);

module.exports = router;