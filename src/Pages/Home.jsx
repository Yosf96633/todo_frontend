import React, { useEffect, useState } from "react";
import { Form, Button, Input, message, Spin, Checkbox, Tooltip } from "antd";
import { IoAddOutline } from "react-icons/io5";
import { DeleteOutlined } from "@ant-design/icons"; // Ant Design bin icon
import { axiosInstance } from "../lib/axios";

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  
  return new Intl.DateTimeFormat("en-GB", options).format(date); // British style: day/month/year
  
};

const Home = () => {
  const [form] = Form.useForm();
  const [todo, setTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllTodos = async () => {
    try {
      const { data } = await axiosInstance.get("/todo");
      if (data.success) {
        setTodo(data.data.tasks);
      } else {
        setTodo([]);
      }
    } catch (error) {
      setTodo([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleAddTask = async (values) => {
    const { title } = values;
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post("/todo", { title });
      message.success(data.message);
      setTodo(data.todo.tasks);
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      form.resetFields();
      setIsLoading(false);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (taskId) => {
    console.log(taskId);
    
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.delete(`/todo/${taskId}`);
      message.success(data.message);
      setTodo(prevTodo => prevTodo.filter(task => task._id !== taskId));
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="flex space-x-4 items-center">
        <Form
          form={form}
          onFinish={handleAddTask}
          className="flex space-x-3"
        >
          <Form.Item
            rules={[{ required: true, message: "Task should be added" }]}
            name="title"
          >
            <Input placeholder="Add task" />
          </Form.Item>
          <Button loading={isLoading} htmlType="submit" icon={<IoAddOutline />}>
            Add
          </Button>
        </Form>
      </div>

      {isLoading ? (
        <Spin size="large" className="mt-4" />
      ) : todo.length === 0 ? (
        <p className="text-xl text-gray-500 font-semibold text-center mt-4">
          No To-dos found
        </p>
      ) : (
        <div className="mt-4">
          {todo.map((task) => (
            <div key={task._id} className=" w-[90vw] flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-5">
              <Checkbox 
  onChange={async (e) => {
    try {
      // Patch request to toggle the status in the backend
      const { data } = await axiosInstance.patch(`/todo/${task._id}`);

      // Destructure the updated task from the response
      const updatedTask = data.task;

      // Update state by finding the correct task and replacing it with the updated task
      setTodo((prevTodos) => 
        prevTodos.map((todoItem) => 
          todoItem._id === updatedTask._id ? updatedTask : todoItem
        )
      );
    } catch (error) {
      console.error("Error updating todo status:", error);
      // Optionally, show a message to the user if there's an error
    }
  }} 
  checked={task.status} 
/>

                <span className={`ml-2 ${task.status ? "line-through" : ""} ${task.status ? "text-gray-600" : " text-black"}`}>
                  {task.title}
                </span>
              </div>

              {/* Task Details Container (Delete button and time) */}
              <div className="flex flex-col items-center justify-between">
                {/* Delete Button */}
                <Tooltip title="Delete task">
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-red-700"
                  />
                </Tooltip>

                {/* Formatted Date */}
                <span className="text-xs sm:text-sm text-gray-500 mt-2">
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
