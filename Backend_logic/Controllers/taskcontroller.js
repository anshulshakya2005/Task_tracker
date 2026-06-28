const TaskModel = require('../Models/taskmodel');
const createtask = async (req,res)=>{
    const data = req.body;
    try{
        
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({
            success:true,
            message:'Task created successfully',
            data:model
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const getalltask = async(req,res)=>{
    try{
        const data = await TaskModel.find();
        res.status(200).json({
            success:true,
            message:'All tasks fetched successfully',
            data:data
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const updatetask = async(req,res)=>{
    try{
    const {id} = req.params;
    const body = req.body;
    const obj = {$set:{...body}};
    const data = await TaskModel.findByIdAndUpdate(id,obj,{new:true});
    res.status(200).json({
        success:true,
        message:'Task updated successfully',
        data:data
    })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const deletetask = async(req,res)=>{
    try{
        const {id} = req.params;
        const data = await TaskModel.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:'Task deleted successfully',
            data:data
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

module.exports = {createtask, getalltask, updatetask, deletetask};