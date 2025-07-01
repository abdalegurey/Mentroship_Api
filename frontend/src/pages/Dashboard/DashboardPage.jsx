import React, { useState } from 'react'
import  useStore  from "../../lib/Store/Countstore"
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { DashboardWelcome } from '@/components/dashboard/DashboardWelcome'
import TaskForm from '@/components/Task/TaskForm'
import TaskLists from '@/components/Task/TaskLists'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api/apiClient'
import { Loader } from 'lucide-react'
const DashboardPage = () => {

      const [showCreateForm, setShowCreateForm] = useState(false)
    const [editingTask, setEditingTask] = useState(null)
        

   const handleFormClose = () => {
        setShowCreateForm(false)
        setEditingTask(null)
    }
    const handleCreateTaskClick=()=>{
       setShowCreateForm(true)
    }

    const tasksQuery=useQuery({
      queryKey:["tasks"],
      queryFn:async()=>{
        const response=await api.get("/Tasks/getAllTasks")
        return response.data
      },
      retry:1
    });

    if (tasksQuery.isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin' />
            </div>
        )
    }



    const handleEditTask=(task)=>{
      setEditingTask(task)
      setShowCreateForm(true)

    }

    const handleStatusChange=async(taskId,statusData)=>{
     

    }
    const HandleDeleteTask=()=>{

    }
       if (tasksQuery.isError) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <p className='text-red-500'>Error loading tasks: {tasksQuery.error.message}</p>
            </div>
        )
    }

 
  return (
    <div className='min-h-screen bg-background'>
      {/* header */}
<DashboardHeader/>
      <main className='w-full '>
        <DashboardWelcome showCreateForm={showCreateForm}
          onCreateTask={handleCreateTaskClick}
        
        
        />

        {/* section */}
        {/* Task Section */}
        <div>
          <TaskLists  tasks={tasksQuery.data || []}
                        isLoading={tasksQuery.isLoading}
                         onEdit={handleEditTask}
                        onStatusChange={handleStatusChange}
                        onDeleteTask={HandleDeleteTask}
                 


                        
                        
                        
                        
                        />
        </div>
      </main>

      {/* task dailog form */}
      <TaskForm

task={editingTask}
      open={showCreateForm || !!editingTask}
      onOpenChange={handleFormClose}
   

      
      
      />

    </div>
  )
}

export default DashboardPage
