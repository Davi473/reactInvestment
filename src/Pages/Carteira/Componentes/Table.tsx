import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from "../../../Componentes/Table";

// Definindo a interface para os dados
interface Valor {
  id: number;
  ticket: string;
  tipo: string;
  quantidade: number;
  media: number;
}

function TableMedia() {
  const [valores, setValores] = useState<Valor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3005/carteira', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setValores(response.data);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/'); // Redireciona para a página de login
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Função personalizada para renderizar as linhas
  const customRowRenderer = (item: Valor) => (
    <tr key={item.id} style={{ backgroundColor: item.media > 50 ? 'lightgreen' : 'lightcoral' }}>
      <td>{item.id}</td>
      <td>{item.ticket}</td>
      <td>{item.tipo}</td>
      <td>{item.quantidade}</td>
      <td>{item.media}</td>
    </tr>
  );

  // Função personalizada para renderizar o cabeçalho
  const customHeaderRenderer = () => (
    <tr>
      <th style={{ color: 'blue' }}>#</th>
      <th style={{ color: 'blue' }}>Ticket</th>
      <th style={{ color: 'blue' }}>Tipo</th>
      <th style={{ color: 'blue' }}>Quantidade</th>
      <th style={{ color: 'blue' }}>Média</th>
    </tr>
  );

  if (loading) {
    return <div>Loading...</div>; // Mensagem de carregamento
  }

  return (
    <div className='text-center'>
      <Table 
        valores={valores} 
        rowRenderer={customRowRenderer} 
        headerRenderer={customHeaderRenderer} 
      />
    </div>
  );
}

export default TableMedia;



/*
    import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3005/protected', {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho da requisição
          },
        });
        setData(response.data); // Supondo que a resposta contenha os dados que você precisa
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Home</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
    };

    export default Home;

*/
