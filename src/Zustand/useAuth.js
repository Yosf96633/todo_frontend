import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuth = create((set) => ({
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  messagee:``,
  isLoading:false,
  success:false,
  sign_up: async ({ name, email, password }) => {
    set({isLoading:true});
    try {
      const { data } = await axiosInstance.post(`/user/register`, {
        name,
        email,
        password,
      });
      set({messagee:data.message , success:data.success})
    } catch (error) {
      set({messagee:error.response.data.message, success:false})
         
    }
    finally{
      set({isLoading:false})
    }
  },

  log_in: async ({ email, password }) => {
    set({ isLoading: true, messagee: `` });
    
    try {
      const { data } = await axiosInstance.post(`/user/login`, {
        email,
        password,
      });
  
      // Store userData in localStorage on successful login
      if (data.success) {
        localStorage.setItem('userData', JSON.stringify(data.data)); // Store user data
      }
  
      set({ messagee: data.message, userData: data.data, success: data.success });
    } catch (error) {
      set({ messagee: error.response.data.message, success: false });
    } finally {
      set({ isLoading: false });
    }
  },
  

  log_out: async () => {
    try {
      set({isLoading:true , messagee:``});
      await axiosInstance.post("/user/logout");
      set({userData: null});
      localStorage.removeItem("userData");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
        set({messagee:errorMessage});
    }
    finally{
      set({isLoading:false});
    }
  },
  delete_account:async () => {
        try {
          const {data} = await axiosInstance.post("user/delete")
          set({userData:null})
          localStorage.removeItem('userData');
        } catch (error) {
          
        }
  },
  reset:()=>{
    set({messagee:``, success:false , isLoading:false})
  }
  
}));
