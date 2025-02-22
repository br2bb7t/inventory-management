import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Gestión de Inventario link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Gestión de Inventario/i);
  expect(linkElement).toBeInTheDocument();
});
