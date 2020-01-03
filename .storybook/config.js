import { configure } from '@storybook/react';
import '../src/index.css';
import requireContext from 'require-context.macro';

// automatically import all files ending in *.stories.js
// configure(require.context('../src/components', true, /\.stories\.js$/), module);

const req = requireContext('../src/components', true, /\.stories\.js$/);

const loadStories = () => {
    return req.keys().map(filename => req(filename));
}

configure(loadStories, module);