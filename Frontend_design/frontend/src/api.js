import { API_URL } from "./utils"

export const getalldata = async()=>{
    const url = `${API_URL}/tasks`;
    const options = {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const result = await fetch(url);
        const data = await result.json();
        return data; // always same format
    } catch (err) {
        return {
            success: false,
            message: err.message
        };
    }
}
export const createtask = async (taskobj)=>{
    const url= `${API_URL}/tasks/create`;
    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(taskobj)
    };
    try{
        const result = await fetch(url,options);
        const data = await result.json();

        return data;
    }catch(err){
        return err;
    }
}

export const deletetask = async (id)=>{
    const url = `${API_URL}/tasks/delete/${id}`;
    const options = {
        method : 'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    };
    try{
        const result = await fetch(url,options);
        const data = await result.json();
        return data;

    }catch(err){
        return err;
    }
}

 export const updatetask = async (id, reqbody) => {
  const url = `${API_URL}/tasks/update/${id}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqbody),
  };

  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};