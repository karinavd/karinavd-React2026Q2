import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Modal } from '../components/Modal';

describe('Modal Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    const portalRoot = document.getElementById('modal-root');
    if (portalRoot) document.body.removeChild(portalRoot);
  });

  it('doesn`t render if isOpen === false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.queryByText('Modal Content')).toBeNull();
  });

  it('renders successfully if isOpen === true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked (Х)', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    await user.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose the Escape button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    await user.keyboard('{Escape}');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  it('doesn`t call onClose when other keys (except Escape) are pressed', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    await user.keyboard('{Enter}');
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('Doesn`t trigger onClose when clicking inside the modal window`s content', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div data-testid="inner-content">Modal Content</div>
      </Modal>
    );
    const innerContent = screen.getByTestId('inner-content');
    await user.click(innerContent);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('Calls `onClose` when the dark background (overlay) of the modal window is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
