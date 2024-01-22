export const borrarCookie = (nombre) => {
  document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // Recargar la página
  window.location.reload();
};
