const express = require("express");
const router = express.Router();

const {authRequired} = require("../../middlewares/accessMiddleware")

const accessRouter = require("./accessRouter");

router.use("/access", accessRouter);

router.use(authRequired);

router.get("/logged", (req, res, next) => {
    res.status(200).json(req.user)
})

module.exports = router;