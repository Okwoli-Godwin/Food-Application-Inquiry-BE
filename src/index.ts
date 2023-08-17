import express, { Application, Request, Response } from "express";
import { environmentVariables } from "./enviromentvariables/enviromentvariables";
import { ApplicationConfig } from "./app";
import { DBConnection } from "./config/Database";


const app: Application = express();

ApplicationConfig(app)
DBConnection()

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "API Ready for deployment"
  })
})

process.on("uncaughtException", (error: Error) => {
  console.log("stop here: uncaughtException");
  console.log(error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("stop here: unhandledRejection");
  console.log(reason);
  process.exit(1);
});

app.listen(environmentVariables.PORT, () => {
    console.log("Server is up and running", environmentVariables.PORT)
})
