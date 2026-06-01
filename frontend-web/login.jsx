import React, { useState } from 'react';

const Login = () => {
    // 1. Estados para guardar lo que el usuario escribe y los posibles errores
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensajeError, setMensajeError] = useState(null);

    // 2. Función que se ejecuta al presionar "Ingresar"
    const manejarLogin = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setMensajeError(null); // Limpiamos errores previos

        try {
            // 3. Hacemos la petición al backend
            const respuesta = await fetch('http://localhost:3000/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    plataforma: 'web' // <-- ¡Aquí le decimos al backend que somos la web!
                })
            });

            const datos = await respuesta.json();

            // 4. Evaluamos la respuesta del servidor
            if (!respuesta.ok) {
                // Si el backend nos mandó la bandera de descargar la app (Ciudadano)
                if (datos.accion === 'redirigir_descarga') {
                    alert(`🛑 Acceso denegado:\n${datos.mensaje}`);
                    // Aquí podrías redirigir a una página de descarga real:
                    // window.location.href = '/descargar-app';
                } else {
                    // Si es un error normal (contraseña mala, admin en app, etc.)
                    setMensajeError(datos.error || 'Error al iniciar sesión');
                }
                return;
            }

            // 5. ¡Si todo sale bien! Guardamos el token y damos la bienvenida
            localStorage.setItem('token', datos.token); // Guardamos la "llave" en el navegador
            alert(`¡Bienvenido al panel de control, ${datos.usuario.nombre}!`);
            
            // Aquí rediriges a tu vista principal de react (ej: usando react-router-dom)
            // window.location.href = '/dashboard'; 

        } catch (error) {
            console.error("Error de conexión:", error);
            setMensajeError("No se pudo conectar con el servidor. Revisa que esté encendido.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
            <h2>Iniciar Sesión (Administración)</h2>
            
            {/* Si hay un error, lo mostramos en rojito */}
            {mensajeError && (
                <div style={{ color: 'white', backgroundColor: '#ff4d4d', padding: '10px', marginBottom: '15px', borderRadius: '5px' }}>
                    {mensajeError}
                </div>
            )}

            <form onSubmit={manejarLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Correo Electrónico:</label><br/>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                
                <div>
                    <label>Contraseña:</label><br/>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Ingresar al Sistema
                </button>
            </form>
        </div>
    );
};

export default Login;