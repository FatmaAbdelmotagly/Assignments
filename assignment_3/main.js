//part 1
const fs= require("node:fs")
const ex = require("express")
const app = ex();
const path = require("path");
const { message } = require("statuses");
const { json } = require("body-parser");
const port = 3000;
// 1 :
// The Event Loop is the mechanism that allows Nodejs to handle asynchronous operations without blocking the main thread
//2 :
// a library that contains Event Loop / Thread Pool / Asynchronous fs operations and used to handle asynchronous and nonblocking operations
// 3 :
// operation is passed to libuv => libuv handle it using pool thread or os => When the operation finishes its callback is placed in the queue => The Event Loop eventually moves the callback to the Call Stack to be executed
// 4 :
// Call Stack: Keeps track of the functions currently being executed
// Event Queue: Stores callbacks waiting to be executed after asynchronous operations finish
// Event Loop: Checks if the Call Stack is empty and moves callbacks from the queue to the Stack
// 5 :
//The Thread Pool is a group of worker threads provided by Libuv to handle certain operations
// 6 :
//Blocking code stops the main thread until the operation finishes
//Nonblocking code starts the operation and allows Nodejs to continue executing other code while waiting for the result
 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//part 2
//prob 1 :
app.use(ex.json());
app.post("/user",(req,res,next)=>{
    const {userName, password , email} = req.body
    
    fs.readFile(path.resolve("./users.json"),"utf-8",(err,fileData)=>{
        if(err){
            return next(err)
        }else{
             fileData = JSON.parse(fileData)
            const exists = fileData.find(ele=>ele.email==email)
            if(exists){
                res.status(409).json({message:"email in use"})
            }else{
        
                fileData.push({"id" : Date.now(),userName, password , email})
                fs.writeFile(path.resolve("./users.json"),JSON.stringify(fileData),"utf-8",(err)=>{
                    if(err){
                        return next(err)
                    }else{
                        res.status(200).json({message : "user added successfully ❤️"})
                    }
                })
            }

        }
    })
})

// prob 2 :
app.patch("/user/:id",(req,res,next)=>{
    const {email , password , userName}=req.body
    const {id} = req.params
    fs.readFile(path.resolve("./users.json"),"utf-8",(err,data)=>{
        if (err){
            return next(err)
        }else{
            data=JSON.parse(data)
            const userExists = data.find(ele=>ele.id==id)
            if(userExists){
                if(email!=undefined){
                    userExists.email=email
                }
                if(password!=undefined){
                    userExists.password=password
                }
                if(userName!=undefined){
                    userExists.userName=userName
                }
                fs.writeFile(path.resolve("./users.json"),JSON.stringify(data),"utf-8",(err)=>{
                    if(err){
                        return next(err)
                    }else{
                        res.status(200).json({message : "user updated successfully "})
                    }
                })
            }else{
                res.status(404).json({message : "user not found "})
            }
        }
    })

})
//prob 3 :
app.delete("/user/{:id}",(req,res,next)=>{
    const {id} =(req.body||req.params)
    fs.readFile(path.resolve("./users.json"),"utf-8",(err,data)=>{
        if(err){
              return next(err)
        }else{
            data=JSON.parse(data)
            const user = data.find(ele=>ele.id==id)
            if(!user){
                res.status(404).json({message : "user not found "})
            }else {
                data = data.filter(ele=>ele.id != id)
                fs.writeFile(path.resolve("./users.json"),JSON.stringify(data),"utf-8",(err)=>{
                    if(err){
                        res.status(500).json({message : "can not delete user"})
                    }else{
                        res.status(200).json({message : "user deleted "})
                    }
                })
            }
        }
    })
})
// prob 4 :
app.get("/user/getByName",(req,res,next)=>{
    const {userName} = req.query
        fs.readFile(path.resolve("./users.json"),"utf-8",(err,data)=>{
        if(err){
              return next(err)
        }else{
            data = JSON.parse(data)
            const user = data.find(ele=>ele.userName==userName)
            if(user){
                res.status(200).json(user)
            }else{
                res.status(404).json({message : "user not found "})
            }
        }
    })
})
//prob 5 :
app.get("/user",(req,res,next)=>{
    fs.readFile(path.resolve("./users.json"),"utf-8",(err,data)=>{
        if (err){
            return next(err)
        }else{
            data =JSON.parse(data)
            res.status(200).json(data)
        }
    })
})
//prob 6 :
app.get("/user/filter",(req,res,next)=>{
    const {minAge} = req.query
    fs.readFile(path.resolve("./users.json"),"utf-8",(err,data)=>{
        if(err){
            return next(err)
        }else{
            data=JSON.parse(data)
            const users = data.filter(user=>user.age>=minAge)
            if(users.length==0){
                res.status(404).json({message : "users not found "})
                return
            }
            res.status(200).json(users)
        }
    })
})
//prob 7 :
app.get("/user/:id",(req,res,next)=>{
    const {id} = req.params
    fs.readFile(path.resolve("./users.json"),"utf-8",(err,data)=>{
        if(err){
            return next(err)
        }else{
            data =JSON.parse(data)
            const user = data.find(ele=>ele.id==id)
            if(user){
                res.status(200).json(user)
            }else{
                res.status(404).json({message : "user not found "})
            }
        }
    })
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})