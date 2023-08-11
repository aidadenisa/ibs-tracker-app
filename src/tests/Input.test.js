import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '@/components/general/Input';

describe('<Input/>', () => {
  test('renders', async () => {
    render(<Input type="text" placeholder={'Test Input'} />);

    await screen.findByPlaceholderText('Test Input');
  });

  test('has the correct value', async () => {
    const mockHandler = jest.fn();
    render(<Input type="text"
      placeholder="Test Input"
      onChange={mockHandler}
    />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText('Test Input');
    await user.type(input, 'valueeee');

    expect(input).toBeDefined();
    expect(input.value).toBe('valueeee');
  });

});