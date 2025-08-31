const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks',async(req,res)=>{
    try{
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks',async(req,res)=>{
    try {
       const tasks = await Task.find({})
       res.send(tasks) 
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id',async(req,res)=>{
    try {
       const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true }) 
         if(!task){
            return res.status(404).send("Task not found")
         }
         res.send(task)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete('/tasks/:id',async(req,res)=>{
try {
   const task = await Task.findByIdAndDelete(req.params.id)
    if(!task){
            return res.status(404).send("Task not found")
         }
         res.send(task) 
} catch (e) {
            res.status(500).send(e.message)

}
})

module.exports = router