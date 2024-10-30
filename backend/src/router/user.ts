import {Router} from "express";
import { authMiddleware } from "../middleware";
import { SingUpSchema, SignInSchema } from "../types";
import { prismaClient } from "../db";
import Jwt from "jsonwebtoken";
import { JWT_TOKEN } from "../config";
 

const router = Router();

router.post("/signup", async (req, res)=>{
    const body = req.body.username;
    const parsedData = SingUpSchema.safeParse(body);

    if(!parsedData.success){
        res.status(411).json({
            message : "Incorrect inputs"
        })
        return;
    }
    const userExists = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username
        }
    })

    if(userExists)
        {
            res.status(409).json({
                message: "User already exists"
            })
            return;
        }
        await prismaClient.user.create({
            data:{
                email: parsedData.data.username,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })

        //send email()
         res.json({
            message: "please verify your account by checking your account"
         })
    
    })




router.post("/signin",authMiddleware, async  (req,res)=>{
    const body = req.body;
    const parsedData = SignInSchema.safeParse(body);

    if(!parsedData.success){
        res.status(411).json({
            message : "Incorrect inputs"
        })
        return;
    }
    const user = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })
    if(!user)
        {
            res.status(404).json({
                message: "credentials are innpcorrect"
            })
            return;
        }
    const token = Jwt.sign({
        id: user.id
    }, JWT_TOKEN)

    res.json({
        token
    })
    console.log("singin handler");


})

router.get("/",authMiddleware, (req,res)=>{
    //@ts-ignore
    const id = req.id;

    const user = prismaClient.user.findFirst({
        where:{
            id
        },
        select:{
            email: true,
            name: true
        }
    })
      res.json({
        user
    })

    console.log("all users")
})

export const userRouter = router;