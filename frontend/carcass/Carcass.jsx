import { Provider } from 'react-redux';

import { configureStore } from 'store';

import styles from './Carcass.scss';

const store = configureStore();

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Carcass extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <section styleName="carcass">
                    { this.props.children }
                </section>
            </Provider>
        );
    }
}

export default Carcass;