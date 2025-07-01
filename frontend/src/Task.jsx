import { useMutation, useQueryClient } from '@tanstack/react-query';
import { json } from 'express';
import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"

const CreateTask = async (newTask) => {
 const response = await fetch("http://localhost:3000/api/Tasks/CreateTask", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }
};




const Task = () => {


    const [Task, setTask]= useState("");
    const queryClient= useQueryClient();
    const mudattion= useMutation({
        mutationFn:CreateTask,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                  queryKey:["tasks"]
            })
           
        }
    })



    const HandleAdd=()=>{
        mudattion.mutate({
            title:Task,
           
        })
    
}

  return (
    <div>
        <input type="text" onChange={(e)=>setTask(e.target.value)} />
        <button onClick={HandleAdd}>Save</button>

        <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
      
    </div>
  )
}

export default Task
