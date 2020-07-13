import { createBrowserHistory } from "history";
import { createStore } from 'redux';

const history = createBrowserHistory()
const store = createStore(
  () => {}
)

export { history };
export default store;