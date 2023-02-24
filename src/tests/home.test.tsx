import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

describe('Home render test', () => {
  it('should render component', () => {
    
    render(<Home />)
    const divElement = screen.getByRole('generic', { name: /div/i })
    expect(divElement).toBeInTheDocument();

  });
});