'use strict';

var express = require('express');
var controller = require('./feedback.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/event/:id',auth.hasRole('coord'),controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;