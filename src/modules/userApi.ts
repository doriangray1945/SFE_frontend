export const Login = async (username: string, password: string): Promise<string> => {
  const response = await fetch(`/api/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  // Проверка статуса HTTP (например, 200 или 400)
  if (!response.ok) { 
    const errorText = await response.text();  // Читаем текст ошибки
    throw new Error(errorText || 'Ошибка авторизации');
  }

  // Читаем текст ответа (например, "status:ok")
  const data = await response.text();
  console.log('Ответ от сервера:', data);

  return data;  // Возвращаем текстовое значение
};
