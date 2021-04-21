import app from "./config/app";
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
})