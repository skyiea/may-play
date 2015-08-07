import React    from 'react';
import $        from 'jquery';
import App      from './body/Body';

$(() => {
    React.render(<App />, document.getElementById('app-container'))
});