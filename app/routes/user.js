const middlewares = require("../middlewares/middlewares.js");

module.exports = {

    "GET": {
        "/":  {
            middlewares: null,
            callback: (app, req, res) => {
                app.controllers.user.index(app, req, res);
            }
        },
        "/cadastrar":  {
            middlewares: null,
            callback: (app, req, res) => {
                app.controllers.user.create(app, req, res);
            }
        },
        "/:id/mostrar":  {
            middlewares: null,
            callback: (app, req, res) => {
                app.controllers.user.show(app, req, res);
            }
        },
        "/:id/editar":  {
            middlewares: null,
            callback: (app, req, res) => {
                app.controllers.user.edit(app, req, res);
            }
        },
    },

    "POST": {

    },

    "UPDATE": {

    },

    "DELETE": {

    }
    
    // "/":  {
    //     method: "GET",
    //     middlewares: null,
    //     callback: (app, req, res) => {
    //         app.controllers.user.index(app, req, res);
    //     }
    // },

    // "/cadastrar":  {
    //     method: "GET",
    //     middlewares: null,
    //     callback: (app, req, res) => {
    //         app.controllers.user.create(app, req, res);
    //     }
    // },

    // "/cadastrar":  {
    //     method: "POST",
    //     middlewares: null,
    //     callback: (app, req, res) => {
    //         app.controllers.user.store(app, req, res);
    //     }
    // },

    // "/:id/mostrar":  {
    //     method: "GET",
    //     middlewares: null,
    //     callback: (app, req, res) => {
    //         app.controllers.user.show(app, req, res);
    //     }
    // },

    // "/:id/editar":  {
    //     method: "GET",
    //     middlewares: null,
    //     callback: (app, req, res) => {
    //         app.controllers.user.edit(app, req, res);
    //     }
    // },

    // "/:id/editar":  {
    //     method: "UPDATE",
    //     middlewares: null,
    //     callback: (app, req, res) => {
    //         app.controllers.user.update(app, req, res);
    //     }
    // },

    // "/:id/deletar":  {
    //     method: "DELETE",
    //     middlewares: null,
    //     callback: (app, req, res) => {
    //         app.controllers.user.destroy(app, req, res);
    //     }
    // }


    
    // app.get("/", middlewares.auth(), (req, res) => {
    //     app.app.controllers.user.index(app, req, res);
    // });

    // app.get("/cadastrar", (req, res) => {
    //     app.app.controllers.user.create(app, req, res);
    // });

    // app.post("/cadastrar", (req, res) => {
    //     app.app.controllers.user.store(app, req, res);
    // });

    // app.get("/:id/mostrar", (req, res) => {
    //     app.app.controllers.user.show(app, req, res);
    // });

    // app.get("/:id/editar", (req, res) => {
    //     app.app.controllers.user.edit(app, req, res);
    // });
    
    // app.put("/:id/editar", (req, res) => {
    //     app.app.controllers.user.update(app, req, res);
    // }); 

    // app.delete("/:id/deletar", (req, res) => {
    //     app.app.controllers.user.destroy(app, req, res);
    // });
}