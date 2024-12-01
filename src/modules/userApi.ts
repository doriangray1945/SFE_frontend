export interface User {
  username: string;
  password: string;
}

  
export const Login = async (username: string, password: string): Promise<User> => {
  const response = await fetch(`/api/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) { 
    console.log("Errorrrr");
  }
  
  /*const data: User = await response.json(); 
  console.log("YES", data);
  return data; */
};
  
