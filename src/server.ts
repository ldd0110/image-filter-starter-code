import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles, downOriginImageFromURL } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });

  app.get("/filteredimage", async (req, res) => {
    const pathImage = req.query.image_url;
    if(!pathImage || /^\s*$/.test(pathImage)){
      res.send("value is required")
    }
    if(pathImage.length < 5){
      res.send("path url is not valid")
    }
    const id = Math.floor(Math.random() * 2000) + "";
    const pathOriginImage = await downOriginImageFromURL(pathImage, id);
    const pathImageFilter = await filterImageFromURL(pathImage, id);
    res.sendFile(pathImageFilter,);
    const arrPathImage: Array<string> = [];
    arrPathImage.push(pathOriginImage);
    deleteLocalFiles(arrPathImage);
    // const validImage = pathImage.substring(pathImage.length-3, pathImage.length).toLowerCase();
    // if(validImage === 'png' || validImage === 'jpg' || validImage === 'jpeg'){
    //   const pathImageFilter = filterImageFromURL(pathImage);
    //   res.sendFile(await pathImageFilter);
    // }else{
    //   res.send("image file wrong file type(PNG/JPG)")
    // }
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();