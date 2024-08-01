import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuantitySelector from 'components/general/QuantitySelector';

describe('QuantitySelector', () => {
  test('renders correctly', () => {
    render(<QuantitySelector quantity='1' />);
    const selectElement = screen.getByLabelText(/Quantity/i);
    expect(selectElement).toBeInTheDocument();
  });
});
