import fetchMock from 'fetch-mock';

export default function xmock(storage) {

  let listenners = [];

  function initialize() {

    let rawRoutes = storage.getRoutes();
    rawRoutes.forEach(r => {
      if (r.isEnable) {
        fetchMock.mock({
          routes: {
            name: r.name,
            matcher: r.matcher,
            response: {
              body: r.responseBody
            },
            sendAsJson: true
          }
        })
      }
    });
  }

  function setRoutes(routes) {
    storage.setRoutes(routes);
    trigger();
  }

  function trigger() {
    listernners.forEach(cb => {
      cb(getRoutes());
    });
  }

  function getRoutes() {
    return storage.getRoutes();
  }

  function addRoute(route) {
    const routes = storage.getRoutes();
    const newRoutes = [
      ...routes,
      route
    ];
    setRoutes(newRoutes);
  }

  function removeRoute(route) {
    const routes = storage.getRoutes();
    const newRoutes = routes.filter(r => {
      return r !== route;
    });
    setRoutes(newRoutes);
  }

  function getAllRoutes() {
    return storage.getRoutes();
  }

  function disableRoute(route) {
    const routes = storage.getRoutes();
    const newRoutes = routes.map(r => {
      if (r === route) {
        r.isEnable = false;
      }
    });
    setRoutes(newRoutes);
  }

  function enableRoute(route) {
    const routes = storage.getRoutes();
    const newRoutes = routes.map(r => {
      if (r === route) {
        r.isEnable = true;
      }
    });
    setRoutes(newRoutes);
  }

  function toggleRoute() {
    const routes = storage.getRoutes();
    const newRoutes = routes.map(r => {
      if (r === route) {
        r.isEnable = !r.isEnable;
      }
    });
    setRoutes(newRoutes);
  }

  function subscribe(listenner) {
    listenners.push(listenner);
    return () => {
      let newListenners = listenners.filter(l => {
        return l !== listenner;
      });
      listenners = newListenners;
    }
  }

  return {
    initialize,
    getRoutes,
    addRoute,
    removeRoute,
    disableRoute,
    enableRoute,
    subscribe
  }
}
