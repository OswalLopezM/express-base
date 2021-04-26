import express from "express";
import * as bodyParser from "body-parser";
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';
import { UserRoutes } from "../api-routes/UserRoutes";
import { CommonRoutes } from "../api-routes/CommonRoutes";


class App {

   public app: express.Application;
   private userRoutes: UserRoutes = new UserRoutes();
   private commonRoutes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.config();
      if(process.env.NODE_ENV === 'development' || 
         process.env.NODE_ENV === 'production'){
         this.mongoSetup();
      }
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
      let mongoURL = process.env.NODE_ENV === 'test' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;
      mongoose.connect(mongoURL, { 
         useNewUrlParser: true, 
         useUnifiedTopology: true, 
         useCreateIndex: true, 
         useFindAndModify: false 
      });
   }
}
export default new App().app;