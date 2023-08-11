import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from '@/components/general/Modal';

describe('<Modal/>', () => {
  test('renders', async () => {
    render(
      <Modal title="Test Title" primaryBtnLabel="Test Button">
        <div>Test child Component</div>
      </Modal>
    );

    await screen.findByText('Test child Component');
  })

  test('renders all props', () => {
    const { container } = render(
      <Modal
        title="Test Title"
        primaryBtnLabel="Test Button Primary"
        secondaryBtnLabel="Test Button Secondary">
        <div>Test child Component</div>
      </Modal>
    );

    const primaryButton = screen.getByText('Test Button Primary');
    const secondaryButton = screen.getByText('Test Button Primary');

    expect(primaryButton).toBeInstanceOf(HTMLButtonElement);
    expect(secondaryButton).toBeInstanceOf(HTMLButtonElement);
    expect(container.querySelectorAll('.modal__action-bar button')).toHaveLength(2);

    expect(container.querySelector('.modal__header .modal__title').innerHTML).toBe('Test Title');
    expect(container.querySelector('.modal__body')).toContainHTML('<div>Test child Component</div>');
  })

  test('on close click handler works', async () => {
    const mockHandler = jest.fn();

    const { container } = render(
      <Modal
        title="Test modal"
        primaryBtnLabel="Test Button"
        onClose={mockHandler}>
        <div>Test Child Component</div>
      </Modal>
    );

    const user = userEvent.setup();
    const closeButton = container.querySelector('.modal__close-btn');
    await user.click(closeButton);

    expect(mockHandler.mock.calls).toHaveLength(1);
  })

  test('primary button click handler works', async () => {
    const mockHandler = jest.fn();

    render(
      <Modal
        title="Test Modal"
        primaryBtnLabel="Test Button"
        onPrimary={mockHandler}>
          <div>Test Child Component</div>
        </Modal>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText('Test Button'));

    expect(mockHandler.mock.calls).toHaveLength(1);
  })

  test('secondary button click handler works', async () => {
    const mockHandler = jest.fn();

    render(
      <Modal
        title="Test Title"
        primaryBtnLabel="Test Primary"
        secondaryBtnLabel="Test Secondary"
        onSecondary={mockHandler}>
          <div>Test Child Component</div>
        </Modal>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText('Test Secondary'));
    expect(mockHandler.mock.calls).toHaveLength(1);
  })

})