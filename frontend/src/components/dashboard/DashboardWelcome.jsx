import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import CardStatus from './CardStatus'

const DashboardWelcome = ({showCreateForm,  onCreateTask}) => {


  return (
     <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader className="pb-4">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2 flex flex-col items-start">
                        <CardTitle className="text-2xl">Welcome back!</CardTitle>
                        <CardDescription className="text-base">
                            Here's what's happening with your tasks today.
                        </CardDescription>
                    </div>

                     {/* TODO: create new task */}
                    <Button
                     onClick={onCreateTask}
                    >
                        Create New Task
                    </Button>
                    </div>
                    </CardHeader>

                       <CardContent className="p-6">
                {/* Card status */}
                <CardStatus/>

            </CardContent >
                    </Card>
  )
}

export {DashboardWelcome}
