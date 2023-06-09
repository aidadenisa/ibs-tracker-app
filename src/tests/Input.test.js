import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import Button from '../components/general/Button';

test('renders content', () => {

  render(<Button
    variant="primary"
    label="Test Button"
  />);

  const element = screen.getByText('Test Button');
  expect(element).toBeDefined();

});

test('renders content (with CSS selector', () => {

  const { container } = render(<Button
    variant="primary"
    label="Test Button"
  />);

  const button = container.querySelector('.ibs-btn');
  expect(button).toHaveTextContent('Test Button');

});
