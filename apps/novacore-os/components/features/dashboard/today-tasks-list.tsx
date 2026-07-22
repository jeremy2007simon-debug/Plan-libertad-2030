"use client"

import { useState, useTransition } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { toggleTaskStatus } from "@/lib/actions/tasks"

export type TodayTask = { id: string; title: string; done: boolean }

export function TodayTasksList({ tasks }: { tasks: TodayTask[] }) {
  const [prevTasks, setPrevTasks] = useState(tasks)
  const [items, setItems] = useState(tasks)
  const [, startTransition] = useTransition()

  if (tasks !== prevTasks) {
    setPrevTasks(tasks)
    setItems(tasks)
  }

  function handleToggle(id: string, done: boolean) {
    setItems((current) =>
      current.map((task) => (task.id === id ? { ...task, done } : task))
    )
    startTransition(() => {
      toggleTaskStatus(id, done)
    })
  }

  if (items.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        Sin tareas para hoy.
      </p>
    )
  }

  return (
    <>
      {items.map((task) => (
        <label
          key={task.id}
          className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-muted/60"
        >
          <Checkbox
            checked={task.done}
            onCheckedChange={(checked) => handleToggle(task.id, checked === true)}
          />
          <span className={task.done ? "text-muted-foreground line-through" : ""}>
            {task.title}
          </span>
        </label>
      ))}
    </>
  )
}
