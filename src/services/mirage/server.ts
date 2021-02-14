import {Server, Model, hasMany, Response, belongsTo, Factory } from "miragejs";
import user from "./Routes/user";
import * as diary from "./Routes/diary"

export const handleErrors = (error: any, messeage = "An error occured") => {
    return new Response(400, undefined, {
        data: {
            messeage,
            isError: true,
        }
    }) 
}

export const setupServer = (env?: string): Server => {
 return new Server({
     environment: env ?? "development",

     models: {
         entry: Model.extend({
            diary: belongsTo()
         }),
         diary: Model.extend({
             entry: hasMany(),
             user: belongsTo()
         }),
         user: Model.extend({
             diary: hasMany()
         }),
     },
    factories: {
        user: Factory.extend({
            username: "test",
            password: "password",
            email: "test@email.com"
        })
    },

    seeds: (server): any => {
        server.create("user")
    },

    routes(): void {
        this.urlPrefix = "https://diary.app";

        this.get("/diary/entry/:id", diary.getEntries)
        this.get("/diary/:id", diary.getDiaries)

        this.post("/auth/login", user.login)
        this.post("/auth/signup", user.signup)

        this.post("/diary/", diary.create)
        this.post("/diary/entry/:id", diary.addEntry)

        this.put("/diary/entry/:id", diary.updateEntries)
        this.put("/diary/:id", diary.updateDiary)
    }

 })
}