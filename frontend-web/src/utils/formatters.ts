export const formatearFecha = (fechaStr: string): string => {
  const fecha = new Date(fechaStr);
  
  const dia = fecha.getDate();
  const mes = fecha.toLocaleDateString('es-ES', { month: 'long' });
  const anio = fecha.getFullYear();
  
  // Esto une los pedazos con espacios limpios: "28 mayo 2026"
  return `${dia} ${mes} ${anio}`;
};

export const formatearHora = (fechaStr: string): string => {
  const fecha = new Date(fechaStr);
  
  //padStart asegura que siempre tengan 2 dígitos (ej: "02" en vez de "2")
  const horas = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  
  return `${horas}:${minutos}`;
};
