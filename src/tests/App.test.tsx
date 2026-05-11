import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import userEvent from '@testing-library/user-event';
const mockResponse = [
  {
    id: '1',
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.info/api/people/1',
  },
  {
    id: '2',
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    url: 'https://swapi.info/api/people/4',
  },
];
describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      )
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('check if app components render correctly', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  it('fetches data successfully from API', async () => {
    render(<App />);

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('https://swapi.info/api/people');
  });
  it('handles search term from localStorage on initial load', async () => {
    localStorage.setItem('savedSearchItem', 'Darth Vader');
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
      expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
    });
  });
  it('displays thy specific error message when API rejects with an Error object', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error ('Failed to fetch data'))
    ));
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument()
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('displays "unknown error" fallback when API rejects with a string or unknown type', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(('Failed to fetch data'))
    ));
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText(/Unknown error/i)).toBeInTheDocument()
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  describe("state management tests",()=>{
    it("manages search term state correctly",async()=>{
const user = userEvent.setup();
render(<App/>);

        const submitBtn = await screen.findByRole('button', { name: /search/i });
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target:{value:'Luke Skywalker'}})
        await user.click(submitBtn);
       expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument(); 
        await user.clear(input);
        fireEvent.change(input, {target:{value:'Darth Vader'}})
        await user.click(submitBtn);
         await waitFor(()=>{
          expect(screen.getByText("Darth Vader")).toBeInTheDocument(); 
        expect(screen.queryByText("Luke Skywalker")).not.toBeInTheDocument(); })
    })
  })
});
