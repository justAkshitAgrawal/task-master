"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DrawingPinFilledIcon, PlusIcon } from "@radix-ui/react-icons";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Toaster, toast } from "sonner";
import autoAnimate from "@formkit/auto-animate";
import TaskCard from "@/components/TaskCard";

const DashboardPage = () => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const { error, data, isLoading } = useQuery("tasks", async () => {
    try {
      const res = await axios.get("/api/tasks");
      return res.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  });

  return (
    <div className=" p-10 text-white flex flex-col items-center">
      <Toaster richColors closeButton />
      <div className="flex items-center gap-2 self-start">
        <h1 className="text-2xl font-semibold ">Your Tasks</h1>
        <DrawingPinFilledIcon className="h-6 w-6" />
      </div>

      <AddTaskModal />

      <div
        ref={parent}
        className="grid max-md:grid-cols-1 grid-cols-4 gap-10 mt-10 w-full self-start"
      >
        {data?.map((task: any) => {
          return <TaskCard key={task._id} task={task} />;
        })}
      </div>
    </div>
  );
};

const AddTaskModal = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation("tasks", {
    mutationFn: async (task: any) => {
      try {
        const res = await axios.post("/api/tasks", task);
        setTaskData({ title: "", description: "" });
        toast.success("Task added successfully");
        setOpen(false);
        return res.data;
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className=" fixed bottom-10 right-10 rounded-full bg-foreground p-2">
          <PlusIcon className="h-5 w-5 text-black" />
        </button>
      </DialogTrigger>
      <DialogContent className="xl:max-w-[425px] rounded max-md:w-[80vw]">
        <DialogHeader>
          <DialogTitle>Add a Task</DialogTitle>
          <DialogDescription>Add a new task to conquer</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col mt-3 ">
          <Label htmlFor="title" className="">
            Title
          </Label>
          <Input
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
            id="title"
            className="mt-2 mb-4"
          />
          <Label htmlFor="username" className="">
            Description
          </Label>
          <Textarea
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
            rows={6}
            id="username"
            className="mt-2 mb-4"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              mutation.mutate(taskData);
              // close modal
            }}
            type="submit"
            className="w-full"
          >
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardPage;
