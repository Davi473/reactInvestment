import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Atualize para useNavigate
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Atualize para useNavigate

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/login', {
        username,
        password,
      });
      const token = response.data.token; // Supondo que a resposta contém um token
      localStorage.setItem('token', token); // Armazena o token no localStorage
      navigate('/home'); // Redireciona para a página Home
    } catch (error) {
      console.error('Login failed:', error);
      // Lógica para tratar erros, como exibir uma mensagem de erro
    }
  };

  const register = async (e: any) =>
  {
    e.preventDefault();
    try {
      navigate("/register");
    } catch (error) {
      alert("Erro ao acessar a pagina");
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </form>
          <div className="container overflow-hidden text-center">
                <div className="row gx-5">
                    <div className="col">
                        <div className="p-3">
                            <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block">
                                Login
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="p-3">
                            <button onClick={register}  type="submit" className="btn btn-primary btn-block">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
    </div>
  );
};

export default Login;
