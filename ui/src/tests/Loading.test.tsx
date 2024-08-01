import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loading from 'components/general/Loading';

describe('Loading component', () => {
  test('renders without crashing', () => {
    render(<Loading />);
  });

  test('displays Oompa Loompa message when noOopaLoompas is false or not provided', () => {
    const { rerender } = render(<Loading />);
    expect(screen.getByText("The Oompa Loompa's are busy fetching your data!!")).toBeInTheDocument();

    rerender(<Loading noOopaLoompas={false} />);
    expect(screen.getByText("The Oompa Loompa's are busy fetching your data!!")).toBeInTheDocument();
  });

  test('does not display Oompa Loompa message when noOopaLoompas is true', () => {
    render(<Loading noOopaLoompas={true} />);
    expect(screen.queryByText("The Oompa Loompa's are busy fetching your data!!")).toBeNull();
  });

});
