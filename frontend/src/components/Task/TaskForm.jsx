import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '../ui/textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api/apiClient'
import useAuthStore from '@/lib/Store/authStore'
import { extractErrorMessages } from '@/util/errorUtil'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'



const TaskForm = ({ task, open = true, onOpenChange }) => {
    const {token,user}=useAuthStore();
    const userId=user._id;
    const   queryClient= useQueryClient()

    
    const TASK_STATUSES = [
    { value: 'pending', label: 'Pending' },
    { value: 'in progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
];
     // State for form values
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        status: 'pending',
        dueDate: ''
    })
    const [validationError, setValidationError] = useState(null)


    useEffect(()=>{
            if (task) {
            setFormValues({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'pending',
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
            });
        } else {
            setFormValues({
                title: '',
                description: '',
                status: 'pending',
                dueDate: ''
            });
        }
        setValidationError(null);

    },[task,open])
    
       const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }
     const handleStatusChange = (value) => {

        setFormValues({
            ...formValues,
            status: value
        })

    }

    const handleCancel=()=>{
        onOpenChange?.(false)
    }
    // const onOpenChange=()=>{

    // }
    // console.log("token",token);
    // console.log("api",api)

    const createTaskMutation=useMutation({
         mutationFn:async(taskData)=>{
            const response= api.post("/Tasks/CreateTask",taskData)
      
            return response.data
            
        },
        onSuccess:(data)=>{
             toast.success('Task Created successfully', { description: 'Your task has been Created.' });
            queryClient.invalidateQueries(['tasks']);
          //  console.log("created",data)

        },
        onError:(err)=>{
            console.error("err",err)

        }
    });

    const UpdateTaskMutation=useMutation({
        mutationFn:async(taskData)=>{
            const response=api.put(`/Tasks/UpdateTask/${task._id}`,taskData)
            return response.data
        },
        onSuccess: (data) => {

            toast.success('Task updated successfully', { description: 'Your task has been updated.' });
            queryClient.invalidateQueries(['tasks']);
            onOpenChange?.(false);
            setFormValues({
                title: '',
                description: '',
                status: 'pending',
                dueDate: ''
            });
         //   console.log("Task updated successfully:", data);
        }
        ,
        onError: (error) => {
            console.error("Error updating task:", error);
            toast.error(`Error updating task: ${extractErrorMessages(error)}`, { description: 'Please try again.' });
            setValidationError(extractErrorMessages(error));
        }
    })

    const  handleSubmit=(e)=>{
        e.preventDefault();

         if (!formValues.title) {
            setValidationError('Title is required');
            return;
        }

         const taskData = {
            title: formValues.title.trim(),
            description: formValues.description.trim() || '',
            status: formValues.status,
            dueDate: formValues.dueDate ? new Date(formValues.dueDate).toISOString() : null
        }

        if(task){
         UpdateTaskMutation.mutate(taskData)

        }else{
              createTaskMutation.mutate(taskData);
         onOpenChange?.(false)

        }
      


    }

    const displayError= validationError || extractErrorMessages(createTaskMutation.error)
     const isLoading = createTaskMutation.isPending || UpdateTaskMutation.isPending;
    //  console.log("createmutate",createTaskMutation);
    //  console.log("UpdateMutate",UpdateTaskMutation)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                 <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Create New Task
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Fill in the details below to create a new task.
                    </DialogDescription>
                </DialogHeader>
                <form 
                 onSubmit={handleSubmit} 
                className="space-y-6">

                    {displayError && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                            {displayError}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={ formValues.title}
                            onChange={handleInputChange}
                            placeholder="Enter task title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            type="text"
                            value={formValues.description}
                            onChange={handleInputChange}
                            placeholder="Enter task description"
                         
                        />
                    </div>
                    <div className="space-y-2">
                        <Select
                             value={formValues.status}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {TASK_STATUSES.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                    {status.value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            value={formValues.dueDate}
                            onChange={handleInputChange}
                        />
                    </div>

                    <DialogFooter className="flex justify-end space-x-2">

                        <Button type="submit" variant="outline" 
                        onClick={handleCancel}
                        >
                            Cancel
                        </Button>


                        <Button type="submit" 
                        // disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader size="sm" />
                                    {task ? 'Updating...' : 'Creating...'}
                                </span>
                            ) : (
                                task ? 'Update Task' : 'Create Task'
                            )}
                           
                         
                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>
            
      
    </Dialog>
  )
}

export default TaskForm
