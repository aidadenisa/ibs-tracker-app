import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/Button';

describe('<Button/>', () => {

  test('renders content', () => {
    render(<Button
      variant="primary"
      label="Test Button"
    />);

    const element = screen.getByText('Test Button');
    expect(element).toBeDefined();
  });

  test('renders content (with CSS selector)', () => {
    const { container } = render(<Button
      variant="primary"
      label="Test Button"
    />);

    const button = container.querySelector('.ibs-btn');
    expect(button).toHaveTextContent('Test Button');
  });

  test('clicking the button calls the event handler once', async () => {
    const mockHandler = jest.fn();
    render(<Button
      variant="primary"
      label="Test Button"
      onClick={mockHandler}
    />);

    const user = userEvent.setup();
    const button = screen.getByText('Test Button');
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
})