import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorModal from 'components/modals/ErrorModal';

// Mock the BasicModal component
jest.mock('components/modals/Modal', () => ({
  __esModule: true,
  default: ({ open, title, body, handleClose }: {open: boolean; title: string; body: string | null; handleClose: () => void }) => (
    open ? (
      <div data-testid="basic-modal">
        <h1>{title}</h1>
        <p>{body}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    ) : null
  )
}));

describe('ErrorModal', () => {
  test('renders without crashing', () => {
    render(<ErrorModal error={null} />);
    expect(screen.queryByTestId('basic-modal')).not.toBeInTheDocument();
  });

  test('opens when an error is passed', () => {
    render(<ErrorModal error="An error occurred" />);
    expect(screen.getByTestId('basic-modal')).toBeInTheDocument();
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });

  test('closes after timeout', async () => {
    jest.useFakeTimers();
    render(<ErrorModal error="An error occurred" />);
    expect(screen.getByTestId('basic-modal')).toBeInTheDocument();

    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(screen.queryByTestId('basic-modal')).not.toBeInTheDocument();
    });
  });

  test('closes when the close button is clicked', () => {
    render(<ErrorModal error="An error occurred" />);
    expect(screen.getByTestId('basic-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));

    expect(screen.queryByTestId('basic-modal')).not.toBeInTheDocument();
  });
});
