const { Router } = require('express');
const router = new Router();

const { getUserInfo } = require('../models/database-functions');

router.get('/get', async (req, res) => {
    let cookies = req.cookies;

    const user = await getUserInfo(cookies);

    let resObj = {
        success: false
    }

    if (user) {
        resObj.user = user.username;
        resObj.role = user.role;
        resObj.success = true;
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;