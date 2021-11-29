import { App } from "./App";
import { Provider } from 'react-redux';
import { store } from './_helpers';

it("renders without crashing", () => {
    <Provider store={store}>
    const div = document.createElement("div");
    ReactDOM.render(<App/>, div);
    </Provider>
});