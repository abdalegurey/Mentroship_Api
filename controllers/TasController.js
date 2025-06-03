import Task from '../models/Task.js';
import User from '../models/User.js';
export const TaskCreate =  async (req, res, next) => {
 try {
    const { title, description, status, dueDate } = req.body;

    const task= new Task({
      title,
      description,
      status,
      dueDate,
      createdBy: req.user._id // Assuming req.user is populated with the authenticated user's data
    });

    const savedTask = await task.save();
    res.status(201).json({
      message: 'Task created successfully',
      task: savedTask
    });


  } catch (err) {
    next(err);
  }
};

export const getTasks=async (req, res, next) => {
     try{

        const task= await Task.find({ createdBy: req.user._id })

        res.status(200).json({
            message: 'Tasks retrieved successfully',
            tasks: task
        });

     }catch(err) {
        next(err);
     }
}

export const UpdateTask = async (req, res, next) => {

    try {
        const task= await Task.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id }, // Ensure the task belongs to the user
            { ...req.body }, //

        )

        if (!task) {
            return res.status(404).json({ message: 'Task not found or does not belong to the user' });
        }
        res.status(200).json({
            message: 'Task updated successfully',
            task: task
        });
        
    } catch (error) {
        next(error);
        
    }
}

export const DeleteTask = async (req, res, next) => {

    try {
        const task = await Task.findOneAndDelete(
            { _id: req.params.id, createdBy: req.user._id } // Ensure the task belongs to the user
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found or does not belong to the user' });
        }

        res.status(200).json({
            message: 'Task deleted successfully',
            task: task
        });
        
    } catch (error) {
        next(error);
        
    }
}
