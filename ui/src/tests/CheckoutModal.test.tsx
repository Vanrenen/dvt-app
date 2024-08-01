import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckoutModal from 'components/modals/CheckoutModal';

// Mock BasicModal component
jest.mock('components/modals/Modal', () => (props: { title: string; body: string; handleClose: React.MouseEventHandler<HTMLButtonElement> | undefined; }) => (
  <div data-testid="modal">
    <div>{props.title}</div>
    <div>{props.body}</div>
    <button data-testid="close-button" onClick={props.handleClose}>Close</button>
  </div>
));

describe('CheckoutModal', () => {
  let setOpenMock: jest.Mock<any, any>;

  beforeEach(() => {
    setOpenMock = jest.fn();
  });

  test('renders modal when openCheckout is true', () => {
    render(<CheckoutModal openCheckout={true} setOpen={setOpenMock} />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Proceed to checkout')).toBeInTheDocument();
  });

  test('calls setOpen with false on component mount', () => {
    render(<CheckoutModal openCheckout={true} setOpen={setOpenMock} />);
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });

  test('calls setOpen with false when handleClose is triggered', () => {
    render(<CheckoutModal openCheckout={true} setOpen={setOpenMock} />);
    const closeButton = screen.getByTestId('close-button');
    userEvent.click(closeButton);
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });
});
