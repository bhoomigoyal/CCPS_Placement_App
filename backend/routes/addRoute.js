import express from "express"
import {addData} from '../controller/add.controller.js'
import {handleFileUpload, uploadFile} from '../controller/upload.controller.js'

const router = express.Router();

//rather than using complete code of apis here we can make their differenet files known as controllers
router.post("/add",addData);
router.post("/upload",uploadFile,handleFileUpload);

export default router;