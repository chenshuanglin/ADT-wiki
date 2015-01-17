var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('projectDoc',{selectName:selectName,selectParent:"项目管理"});
});

module.exports = router;
