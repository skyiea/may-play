import CSSModules from 'react-css-modules';

export default function (styles, options) {
    return CSSModules(styles, Object.assign({ allowMultiple: true }, options));
}