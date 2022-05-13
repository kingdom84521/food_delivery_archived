const versionTag = {
    v1: "/api/v1"
}

const userRouter = require("./User/router")
const storeRouter = require("./Store/router");
const menuRouter = require("./Menu/router");
const dishRouter = require("./Dish/router");
const sessionRouter = require("./Session/router")
const orderRouter = require("./Order/router")

module.exports = app => {
    app.use(`${ versionTag.v1 }/users`, userRouter )
    app.use(`${ versionTag.v1 }/users`, userRouter )
    app.use(`${ versionTag.v1 }/orders`, orderRouter)
    app.use(`${ versionTag.v1 }/restaurant`, storeRouter);
    app.use(`${ versionTag.v1 }/menu`, menuRouter);
    app.use(`${ versionTag.v1 }/dish`, dishRouter);
    app.use(`${ versionTag.v1 }/session`, sessionRouter)
};
