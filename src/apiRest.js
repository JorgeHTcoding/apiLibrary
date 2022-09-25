const app = require("./app")
require("./database").default


app.listen(app.get("port"), function ()
{
    console.log("Server listen on port " + app.get("port"))
})