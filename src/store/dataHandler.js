export default function dataHandler(store) {
  store.subscribe(mutation => {
    if (mutation.type === "router/ROUTE_CHANGED") {
      // console.log(mutation);
      switch (mutation.payload.to.name) {
        case "view_map":
          store.commit("setCurrentElement", null);
          break;

        case "element":
          store.dispatch("fetchCurrentElement", mutation.payload.to.params.id);
          break;

        // case "scenario":
        //   store.dispatch("fetchCurrentScenario", mutation.payload.to.params.id);
        //   break;

        default:
          break;
      }
    }
  });
}
