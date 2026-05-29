export const formatearFecha = (fechaStr: string): string => {
  const fecha = new Date(fechaStr);
  
  const dia = fecha.getDate();
  const mes = fecha.toLocaleDateString('es-ES', { month: 'long' });
  const anio = fecha.getFullYear();
  
  // Esto une los pedazos con espacios limpios: "28 mayo 2026"
  return `${dia} ${mes} ${anio}`;
};
