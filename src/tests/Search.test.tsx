import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Search } from '../components/Search';

vi.mock('./Search.service', () => ({
  getCharacterName: vi.fn(),
  addCharacterName: vi.fn(),
}));
describe('Search component', () => {
  const mockSearch = vi.fn();
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => localStorage.clear());
  describe('render tests', () => {
    it('renders input and button elements in the search component', async () => {
      render(<Search onSearch={mockSearch} isLoading={false} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });
    it("renders 'wait' button content if isLoading props true", () => {
      render(<Search onSearch={mockSearch} isLoading={true} />);
      expect(screen.getByRole('button', { name: /wait/i })).toBeInTheDocument();
    });
    it('displays previously saved search term from localStorage on mount', async () => {
      localStorage.setItem('savedSearchItem', JSON.stringify('Luke Skywalker'));
      render(<Search onSearch={mockSearch} isLoading={false} />);
      expect(screen.getByRole('textbox')).toHaveValue('Luke Skywalker');
    });
    it('shows empty input when no saved term exists', () => {
      render(<Search onSearch={mockSearch} isLoading={false} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
    describe('User Interaction Tests', () => {
      it('updates input value when user types', async () => {
        render(<Search onSearch={mockSearch} isLoading={false} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Yoda' } });
        expect(input).toHaveValue('Yoda');
      });
      it('saves search term to localStorage when search button is clicked', async () => {
        render(<Search onSearch={mockSearch} isLoading={false} />);
        const input = screen.getByRole('textbox');
        const submitBtn = screen.getByRole('button', { name: /search/i });
        fireEvent.change(input, { target: { value: 'Chewbacca' } });
        fireEvent.click(submitBtn);
        expect(localStorage.getItem('savedSearchItem')).toBe(
          JSON.stringify('Chewbacca')
        );
      });
      it('trims whitespace from search input before saving', async () => {
        render(<Search onSearch={mockSearch} isLoading={false} />);
        const input = screen.getByRole('textbox');
        const submitBtn = screen.getByRole('button', { name: /search/i });
        fireEvent.change(input, {
          target: { value: '         Chewbacca       ' },
        });
        fireEvent.click(submitBtn);
        expect(localStorage.getItem('savedSearchItem')).toBe(
          JSON.stringify('Chewbacca')
        );
      });
      it('triggers search callback with correct parameters', async () => {
        render(<Search onSearch={mockSearch} isLoading={false} />);
        const input = screen.getByRole('textbox');
        const submitBtn = screen.getByRole('button', { name: /search/i });
        fireEvent.change(input, { target: { value: 'Chewbacca' } });
        fireEvent.click(submitBtn);
        expect(mockSearch).toHaveBeenCalledWith('Chewbacca');
        expect(mockSearch).toHaveBeenCalledTimes(1);
      });
    });
    describe('LocalStorage Integration', () => {
      it('overwrites existing localStorage value when new search is performed', async () => {
        render(<Search onSearch={mockSearch} isLoading={false} />);
        const input = screen.getByRole('textbox');
        const submitBtn = screen.getByRole('button', { name: /search/i });
        fireEvent.change(input, { target: { value: 'Yoda' } });
        fireEvent.click(submitBtn);
        expect(localStorage.getItem('savedSearchItem')).toBe(
          JSON.stringify('Yoda')
        );
        expect(mockSearch).toHaveBeenCalledWith('Yoda');
        fireEvent.change(input, { target: { value: 'Darth Vader' } });
        fireEvent.click(submitBtn);
        expect(localStorage.getItem('savedSearchItem')).toBe(
          JSON.stringify('Darth Vader')
        );
        expect(mockSearch).toHaveBeenCalledWith('Darth Vader');
      });
    });
  });
});
