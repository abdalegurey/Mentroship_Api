import React, { useState } from 'react'
import TaskCard from './TaskCard'
import { ClipboardCheck, Search } from 'lucide-react'
import { Input } from '../ui/input'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const TaskLists = ({ tasks = [], onEdit, onStatusChange,isLoading,onDeleteTask}) => {
    // console.log("Tasksss",tasks)

    const [searchTerm,setSearchTerm]=useState("")

    const filteredTasks=tasks.filter((task)=>{
         const matchSearch=task.title.toLowerCase().includes(searchTerm.toLowerCase()) || (task.description && task.description.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
         return matchSearch;
    })

    const GettasksBycATEGORY=()=>{

        const alltask={
            AllTasks:filteredTasks.filter((task)=>task)
        }

   const categoriesPending={
            pending:filteredTasks.filter((task)=>task.status==="pending")
        }


     const categoriesInprogres={
        inprogress:filteredTasks.filter((task)=>task.status==="in progress")
     }   
     

     const categoriescompleted={
        completed:filteredTasks.filter((task)=>task.status==="completed")
     }

      const stats = {
            total: tasks.length,
            pending: categoriesPending.pending,
            inProgress: categoriesInprogres.inProgress,
            completed: categoriescompleted.completed
        }
        

        return {categoriesPending,categoriesInprogres,categoriescompleted,alltask,stats};

    }

    
 const {categoriesPending,categoriesInprogres,categoriescompleted,alltask,stats}= GettasksBycATEGORY();

    // const getTaskss=()=>{

    //     const GetAll={
    //         peending:tasks.filter((task)=>task.status==="pending")
    //     }
    //     return {GetAll}
    // }

    // const {GetAll:{peending}}=getTaskss();
    // console.log("Getall",peending)
//     const getTasks = () => {
//   const GetAll = {
//     peending: tasks.filter((task) => task.status === "pending"),
//   };
//   return GetAll;
// };

// // Soo saarida `pending` si toos ah
// const result = getTasks();
// console.log("Pending tasks:", result);

const getTasks = () => {
  return {
    peending: tasks.filter(task => task.status === "pending"),
    completedd: tasks.filter(task => task.status === "completed"),
    inProgresss: tasks.filter(task => task.status === "in progress"),
    
    // waxaad sii wadi kartaa categories kale...
  };
};
const { peending, completedd, inProgresss } = getTasks();






   

    const getTaskStats = () => {
          const total= tasks.length
          
          const pending= tasks.filter((task)=>task.status==="pending").length
            const inprogress= tasks.filter((task)=>task.status==="in progress").length
              const completed= tasks.filter((task)=>task.status==="completed").length


              return {total, pending,inprogress,completed}
          
        }

        const {total,pending,completed,inprogress}=getTaskStats();

    const ShowTaskStatus=(status)=>{
        const all= tasks.length
       const filtered=tasks.filter((t)=>t.status===status).length
       console.log("alllllllll",all)
       return filtered, all
         //const filtered = tasks.filter(task => task.status === status);
       //console.log("Filtered tasks with status:", status, filtered);
    }
    //const { all, filtered } = ShowTaskStatus("completed");

    //    const categorizedTasks = {
    //         all: filteredTasks,
    //         pending: filteredTasks.filter(task => task.status === 'pending'),
    //         inProgress: filteredTasks.filter(task => task.status === 'in progress'),
    //         completed: filteredTasks.filter(task => task.status === 'completed')
    //     }
   

       const TaskGrid = ({tasks, emptyMessage }) => {
          if (tasks.length === 0) {
             return (
                <div className="text-center py-12">
                    <div className="mx-auto max-w-md">
                        <ClipboardCheck className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-sm font-medium text-foreground">No tasks found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    tasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={onEdit}
                            onDeleteTask={onDeleteTask}
                            onStatusChange={onStatusChange}
                            
                        />
                    ))
                }
            </div>
        )
       }



  return (
     <div className="space-y-6 mt-5">
        {}
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" >

                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Total</p>
                        <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold">{total}</p>
                </div>

                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Pending</p>
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">{pending}</p>
                </div>


                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">  {inprogress}</p>
                </div>

                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                           completed
                        </p>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-2xl font-bold text-green-600"> {completed}</p>
                </div>
            </div>

             {/* search input */}

            <div className="flex items-center gap-4">
                <div className="relative flex-1 md:max-w- lg:w-full">
                    <Search className="absolute left-3 top-1/2  h-4 w-4 text-muted-foreground transform -translate-y-1/2" />

                    <Input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="all">all
         <Badge variant="secondary">
                            {total}
                        </Badge>
    </TabsTrigger>
    <TabsTrigger value="pending">Pending
        <Badge variant="secondary">
                            {pending}
                        </Badge>
    </TabsTrigger>
    <TabsTrigger value="in progress">In-Progress<Badge variant="secondary">
                            {inprogress}
                        </Badge></TabsTrigger>
    <TabsTrigger value="completed">Completed<Badge variant="secondary">
                            {completed}
                        </Badge></TabsTrigger>
  </TabsList>
  <TabsContent value="all">
    <TaskGrid
    tasks={alltask.AllTasks}
 

    
    
    />
    </TabsContent>
  <TabsContent value="pending">
    <TaskGrid
    tasks={categoriesPending.pending}
    emptyMessage ={"No Pending Tasks"}

    
    
    />
  </TabsContent>
   <TabsContent value="in progress">

    <TaskGrid
    tasks={categoriesInprogres.inprogress}
    emptyMessage ={"No Inprogress Tasks"}

    
    
    />
   </TabsContent>
    <TabsContent value="completed">
        <TaskGrid
    tasks={categoriescompleted.completed}
    emptyMessage ={"No Completed Tasks"}

    
    
    />
    </TabsContent>
</Tabs>
            </div>
  )
}

export default TaskLists
