import { useEffect, useState } from 'react';
import TableMedia from "./Componentes/Table"
import NavMedia from "../../Componentes/Nav";
import { useNavigate } from 'react-router-dom'; // Atualize para useNavigate


function Lancamento() {
    const navigate = useNavigate(); // Inicializa o useNavigate

    useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token');

        if (token === undefined || token === null || token === '') {
        navigate('/');
        return;
        }
    };

    fetchData();
    }, [navigate]);

    return (
    <div>
        <div className="container mt-3">
            <NavMedia />
        </div>
        <div className="container mt-5">
            <TableMedia />
        </div>
    </div>
    );
}

export default Lancamento;
