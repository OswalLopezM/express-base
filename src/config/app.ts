import express from "express";
import * as bodyParser from "body-parser";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { TestRoutes } from "../api-routes/TestRoutes";
import { UserRoutes } from "../api-routes/UserRoutes";
import { CommonRoutes } from "../api-routes/CommonRoutes";


class App {

   public app: express.Application;
   // private testRoutes: TestRoutes = new TestRoutes();
   private userRoutes: UserRoutes = new UserRoutes();
   private commonRoutes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      // this.testRoutes.route(this.app);
      this.userRoutes.route(this.app);
      this.commonRoutes.route(this.app);
      
   }
   private config(): void {

      dotenv.config();
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }



   private mongoSetup(): void {
      mongoose.connect(process.env.MONGO_URL, { 
         useNewUrlParser: true, 
         useUnifiedTopology: true, 
         useCreateIndex: true, 
         useFindAndModify: false 
      });
   }
}
export default new App().app;