import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BasicModal from 'components/modals/Modal';
import { BasicModalInterface } from 'interfaces/modalInterface';

describe('BasicModal Component', () => {
  const mockHandleClose = jest.fn();

  const defaultProps: BasicModalInterface = {
    open: true,
    handleClose: mockHandleClose,
    title: 'Test Modal Title',
    body: 'This is the body of the test modal.',
    width: '500',
    top: '45%',
    border: '3px solid #123456',
    backgroundColor: '#abcdef',
    color: '#123456',
  };

  const renderComponent = (props = defaultProps) => {
    return render(<BasicModal {...props} />);
  };

  it('should render the modal with the correct title and body', () => {
    renderComponent();
    expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
    expect(screen.getByText('This is the body of the test modal.')).toBeInTheDocument();
  });

  it('should not render the modal when open is false', () => {
    renderComponent({ ...defaultProps, open: false });
    expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();
    expect(screen.queryByText('This is the body of the test modal.')).not.toBeInTheDocument();
  });
});
