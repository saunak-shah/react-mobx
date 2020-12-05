import Globals from "./store/GlobasStore";
import RouteStore from "./store/RouteStore";
import Layout from "./layout/LayoutStore";
class CombinedStore {
  constructor() {
    this.routes = new RouteStore(this);
    this.resetAllStore();
  }
  resetAllStore = () => {
    this.globals = new Globals(this);
    this.layout = new Layout(this);
  };
}
export default CombinedStore;
