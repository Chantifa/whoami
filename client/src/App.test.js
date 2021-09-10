import {render, screen} from '@testing-library/react';
import App from './App';

test('renders save and reload', () => {
    render(<App/>);
    const linkElement = screen.getByText(/save to reload/i);
    expect(linkElement).toBeInTheDocument();
});
