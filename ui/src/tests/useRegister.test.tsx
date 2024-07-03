import { renderHook, act } from '@testing-library/react-hooks';
import useRegister from '../hooks/useRegister';
import { MockedProvider } from '@apollo/client/testing';
import { REGISTER_USER } from '../graphql/mutations';

const mocks = [
  {
    request: {
      query: REGISTER_USER,
      variables: { username: 'testuser', password: 'password' },
    },
    result: {
      data: {
        registerUser: {
          id: '1',
          username: 'testuser',
        },
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: REGISTER_USER,
      variables: { username: 'erroruser', password: 'password' },
    },
    error: new Error('User already exists'),
  },
];

test('useRegister hook registers a user', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useRegister(), {
    wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
  });

  act(() => {
    result.current.handleChange({ target: { name: 'username', value: 'testuser' } } as React.ChangeEvent<HTMLInputElement>);
    result.current.handleChange({ target: { name: 'password', value: 'password' } } as React.ChangeEvent<HTMLInputElement>);
    result.current.handleSubmit({ preventDefault: () => { } } as React.FormEvent);
  });

  await waitForNextUpdate();

  expect(result.current.data).toEqual({ registerUser: { id: '1', username: 'testuser' } });
});

test('useRegister hook handles registration error', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useRegister(), {
    wrapper: ({ children }) => <MockedProvider mocks={errorMocks}>{children}</MockedProvider>,
  });

  act(() => {
    result.current.handleChange({ target: { name: 'username', value: 'erroruser' } } as React.ChangeEvent<HTMLInputElement>);
    result.current.handleChange({ target: { name: 'password', value: 'password' } } as React.ChangeEvent<HTMLInputElement>);
    result.current.handleSubmit({ preventDefault: () => { } } as React.FormEvent);
  });

  await waitForNextUpdate();

  expect(result.current.formError).toBe('User already exists');
});
