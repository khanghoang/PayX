const getRoutes = () => {
  const routes = JSON.parse(localStorage.getItem('_routes'));
  return routes || [];
}

const setRoutes = (routes) => {
  const routesString = JSON.stringify(routes);
  return localStorage.setItem('_routes');
}

export default {
  getRoutes,
  setRoutes
};
