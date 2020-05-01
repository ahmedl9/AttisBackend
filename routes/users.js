const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
 
router.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    //res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    
    
    // First Validate The Request
    console.log("just got hit with an object that is: ");
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) {
        console.log("error in node backend");
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet'
        console.log("making user");
        user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            loan_amount: req.body.loan_amount,
            date: Date.now(),
            was_referred: req.body.was_referred,
            referral_count: req.body.referral_count

        });
        await user.save();
        res.send(user);
    }


});
 
module.exports = router;
