import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Atualize para useNavigate
import axios from 'axios';
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmacao, setPasswordConfirmacao] = useState("");
  const navigate = useNavigate(); // Atualize para useNavigate

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if(password === passwordConfirmacao) 
      {
        if(username === "" && username === null && username === undefined)
        {
          alert("Não possui valor o username");
          return;
        } else {
          axios.post
             ("http://localhost:3005/register", {username, password});
          navigate('/'); // Redireciona para a página Login
        }
      } else  {
        alert("Senha não esta igual");
        return;
      }
    } catch (error) {
      console.error('falha ao register:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
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
              <label htmlFor="password">Digite uma senha</label>
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
            <div className="form-group">
              <label htmlFor="password">Digite a mesma senaha novamente</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={passwordConfirmacao}
                onChange={(e) => setPasswordConfirmacao(e.target.value)}
                required
              />
            </div>

          </form>
          <div className="container overflow-hidden text-center">
                <div className="row gx-5">
                    <div className="col">
                        <div className="p-3">
                            <button  onClick={handleSubmit} type="submit" className="btn btn-primary btn-block">
                                Register
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="p-3">
                            <Link to="/" className="btn btn-primary btn-block">
                                Fazer Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
    </div>
  );
};

export default Register;
