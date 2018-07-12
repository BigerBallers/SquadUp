var express = require('express');
var router = express.Router();
var ParkQueue = require('../models/parkQueue');
// Get Homepage
router.get('/', function(req, res) {
    res.send('Squad Up');
});
//get park page
router.get('/parks', function(req, res) {
    console.log('Get request for all parks');
    ParkQueue.find({})
    .exec(function(err, ParkQueue){
        if(err){
            console.log("Error retrieving parks");
        } else {
            res.json(ParkQueue);
        }
    });
});
module.exports = router;
