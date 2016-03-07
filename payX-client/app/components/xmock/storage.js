const getRoutes = () => {
  const routes = localStorage.getItem('_routes');
  return routes || [];
}

const setRoutes = (routes) => {
  const routesString = JSON.stringify(routes);
  return localStorage.setItem('_routes');
}

export {
  getRoutes,
  setRoutes
};
