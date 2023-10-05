"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "sonner";
import autoAnimate from "@formkit/auto-animate";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const TaskCard = ({
  task,
}: {
  task: {
    _id: string;
    title: string;
    description: string;
  };
}) => {
  const [editTask, setEditTask] = useState(false);
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: "",
    _id: "",
  });

  const parent = useRef(null);
  const parent2 = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
    parent2.current && autoAnimate(parent2.current);
  }, [parent, parent2]);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation("tasks", {
    mutationFn: async (taskId: any) => {
      try {
        const res = await axios.delete("/api/tasks", {
          data: { taskId },
        });
        toast.success("Task deleted successfully");
        return res.data;
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const updateMutation = useMutation("tasks", {
    mutationFn: async (task: any) => {
      try {
        const res = await axios.put("/api/tasks", editTaskData);
        toast.success("Task updated successfully");
        setEditTask(!editTask);
        return res.data;
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  return (
    <Card key={task._id} className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle ref={parent} className="text-xl">
            {editTask ? (
              <Input
                value={editTaskData.title}
                onChange={(e) => {
                  setEditTaskData({
                    ...editTaskData,
                    title: e.target.value,
                  });
                }}
              />
            ) : (
              <h1>{task.title}</h1>
            )}
          </CardTitle>
          <div className="flex items-center gap-4 ">
            {!editTask && (
              <>
                <Pencil1Icon
                  onClick={() => {
                    setEditTask(!editTask);
                    setEditTaskData({
                      title: task.title,
                      description: task.description,
                      _id: task._id,
                    });
                  }}
                  className="h-5 w-5 cursor-pointer"
                />
                <TrashIcon
                  onClick={() => deleteMutation.mutate(task._id)}
                  className="h-5 w-5 text-red-500 cursor-pointer"
                />
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent ref={parent2}>
        {editTask ? (
          <div className="flex flex-col gap-3">
            <Textarea
              value={editTaskData.description}
              onChange={(e) => {
                setEditTaskData({
                  ...editTaskData,
                  description: e.target.value,
                });
              }}
            />
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  updateMutation.mutate(editTaskData);
                }}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setEditTask(!editTask);
                  setEditTaskData({
                    title: "",
                    description: "",
                    _id: "",
                  });
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className=" text-lg">{task.description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
