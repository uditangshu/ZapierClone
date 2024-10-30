import {Router} from "express"
import { authMiddleware } from "../middleware";
const router = Router();



router.get("/",authMiddleware,async (req,res)=>{
    console.log("signin handler")
})

router.get("/:zapId",authMiddleware,async (req,res)=>{
    console.log(" zap handler")
})
router.post("/",authMiddleware,(req,res)=>{
    console.log("create zap")
})
export const zapRouter = router;