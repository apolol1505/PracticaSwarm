import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [serverInfo, setServerInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar el total de clicks desde la BD al iniciar
  useEffect(() => {
    loadTotalClicks();
  }, []);

  const loadTotalClicks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/clicks/total');
      const data = await response.json();
      setCount(data.total);
      setServerInfo(`Servidor: ${data.server} | Total en BD: ${data.total}`);
    } catch (error) {
      setError('Error al cargar clicks desde la BD');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementCount = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/clicks/increment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      setCount(data.total);
      setServerInfo(`Servidor: ${data.server} | Total en BD: ${data.total}`);
    } catch (error) {
      setError('Error al incrementar clicks');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetCount = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/clicks/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      setCount(data.total);
      setServerInfo(`Servidor: ${data.server} | Total en BD: ${data.total}`);
    } catch (error) {
      setError('Error al resetear clicks');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getServerStats = async () => {
    try {
      const response = await fetch('/api/clicks/stats');
      const data = await response.json();
      setServerInfo(`Servidor: ${data.server} | Total: ${data.total} | Uptime: ${Math.round(data.uptime)}s`);
    } catch (error) {
      setError('Error al obtener estadísticas del servidor');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Contador de Clicks - Docker Swarm + MongoDB</h1>
        
        <div className="counter-container">
          <h2>Contador: {count}</h2>
          <div className="button-group">
            <button 
              className="btn btn-primary" 
              onClick={incrementCount}
              disabled={loading}
            >
              {loading ? "Guardando..." : "+1 Click"}
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={resetCount}
              disabled={loading}
            >
              {loading ? "Reseteando..." : "Reset"}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button className="btn btn-outline-danger" onClick={loadTotalClicks}>
              Reintentar
            </button>
          </div>
        )}

        <div className="server-info">
          <button className="btn btn-info" onClick={getServerStats}>
            Obtener Estadísticas
          </button>
          {serverInfo && (
            <div className="info-display">
              <p>{serverInfo}</p>
            </div>
          )}
        </div>

        <div className="swarm-info">
          <h3>🐳 Docker Swarm + MongoDB Demo</h3>
          <p>✅ Los clicks se guardan en la base de datos MongoDB</p>
          <p>✅ Comunicación real entre frontend y backend</p>
          <p>✅ Puedes escalar los servicios para ver el balanceo de carga</p>
          <p>✅ Cada servidor muestra su hostname para ver la distribución</p>
        </div>
      </header>
    </div>
  );
}

export default App;