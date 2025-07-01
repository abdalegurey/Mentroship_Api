import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "../ui/badge"
import { Calendar, Edit2, Loader, MoreVertical, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api/apiClient';
import { toast } from "sonner"
const STATUS_CONFIG = {
    'pending': {
        variant: 'secondary',
        label: 'Pending',
        color: 'text-yellow-600'
    },
    'in progress': {
        variant: 'default',
        label: 'In Progress',
        color: 'text-blue-600'
    },
    'completed': {
        variant: 'outline',
        label: 'Completed',
        color: 'text-green-600'
    }
};

const statuss={
  labels:{
    name:"axmed"
  }
}




// console.log("STATUS_CONFIG.variant",STATUS_CONFIG.pending);
const TaskCard = ({task, onEdit,isLoading = false}) => {


      const [showDeleteDialog, setShowDeleteDialog] = useState(false);
      
      const DisplayStatus=(status)=>{
  const STATUS=task.status ? "text-green-900" : "text-white"

  return STATUS
}



    const statusConfig = STATUS_CONFIG[task.status] || STATUS_CONFIG['pending'];
        const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
      const isOverdue = (dueDate) => {
        if (!dueDate || task.status === 'completed') return false;
        return new Date(dueDate) < new Date();
    };

     const overdue =isOverdue(task.dueDate)

    const   dueDate=formatDate(task.dueDate)

    const queryClient = useQueryClient();
    const deleteMutation=useMutation({
        mutationFn:async (taskId) => {
            const response= await api.delete(`/Tasks/DeleteTask/${taskId}`


            );
            return response.data;
        },
    onSuccess:() => {
            // console.log("Task deleted successfully");

            // Invalidate and refetch tasks to update the UI
            queryClient.invalidateQueries(['tasks']);
            toast.success("Event has been Deletated.")
            setShowDeleteDialog(false);
            // Optionally, you can trigger a refetch of tasks or update the UI
            // to reflect the deletion.
        },
        onError: (error) => {
            console.error("Error deleting task:", error);
            // Handle error, e.g., show a toast notification
        }
    })
  

    const handleDeleteConfirm=async()=>{
       try {
         
        console.log("Task ID to delete:", task._id);
             deleteMutation.mutate(task._id);
        
        
       } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task. Please try again.");
        
       }

       
      
    }

       const EditMuation= useMutation({

        mutationFn:async(TaskId)=>{
            const response=api.put(`/Tasks/UpdateTask/${TaskId}`)
        }
       });


    
 






  return (
    <>
     <Card className="w-full transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg leading-tight">{task?.title}</CardTitle>
                         <div className='flex items-center gap-2'>
                            <Badge variant={statusConfig?.variant} className={'shrink-0'}>
                                {statusConfig?.label}
                            </Badge>

                            {/* Dprodown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        // disabled={isLoading}
                                        className="h-8 w-8 p-0"
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                     onClick={() => onEdit(task)}
                                    >
                                        <Edit2 className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                       onClick={() => setShowDeleteDialog(true)}
                                    >
                                        <Trash className="mr-2 h-4 w-4" />

                                        Delete
                                        
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </div>
                           

                            
      </div>
    </CardHeader>
     <CardContent className="space-y-3">
                    {/* description */}
                    {
                        task.description && (
                            <p className='text-muted-foreground text-sm leading-relaxed'>{task.description}</p>
                        )
                    }

                  {/* due date */}

                    {

                        dueDate && (
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Due:</span>
                                <Badge
                                     variant={overdue ? "destructive" : "outline"}
                                    className="text-xs"
                                >
                                    {dueDate}
                                    {overdue && ' (Overdue)'}
                                </Badge>
                            </div>
                        )
                    }
                    {/* Status */}
                    <Tabs defaultValue="account" className="w-full">
  <TabsList className="grid grid-cols-3 gap-2 w-full">
    <TabsTrigger value="Pending" className={task.status === 'pending' ? 'bg-[#ff6900] tex-white' : 'bg-white'}
 >Pending</TabsTrigger>
    <TabsTrigger value="In Progress" className={task.status === 'in progress' ? 'bg-[#ff6900] text-white' : 'bg-white'}>In Progress</TabsTrigger>
      <TabsTrigger value="Done" className={task.status === 'completed' ? 'bg-[#ff6900] text-white' : 'bg-white'}>Done</TabsTrigger>
  </TabsList>

</Tabs>

                    {/* Simple status indicator */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                        <span>Created: {formatDate(task.createdAt)}</span>
                        <span className={statusConfig.color}>
                            {statusConfig.label}
                        </span>
                    </div>
                  </CardContent>
    </Card>

     <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
       <AlertDialogContent>

                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the task "{task.title}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                            <AlertDialogFooter>

                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                             onClick={handleDeleteConfirm}
                            className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                        >
                           {deleteMutation.isPending ? (
                                <span className="flex items-center gap-2">
                                    <Loader size="sm" />
                                    Deleting...
                                </span>
                            ) : (
                                'Delete'
                            )}
                        
                        </AlertDialogAction>
                            </AlertDialogFooter>
                    </AlertDialogContent>
      
     </AlertDialog>
    </>

    // delete confirmation

    
  )
}

export default TaskCard
