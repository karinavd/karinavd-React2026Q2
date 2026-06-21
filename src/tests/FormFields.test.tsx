import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { InputField } from '../components/UniversalInputField/InputField';
import { SelectField } from '../components/UniversalInputField/SelectField';
import { CheckboxField } from '../components/UniversalInputField/Checkbox';
import { DatalistField } from '../components/UniversalInputField/DataList';

describe('Universal Form Fields', () => {
  
  describe('InputField', () => {
    it('renders successfully with a label and handles input', async () => {
      const user = userEvent.setup();
      render(<InputField id="test-input" label="First Name" />);
      
      const input = screen.getByLabelText('First Name');
      expect(input).toBeInTheDocument();
      
      await user.type(input, 'John Doe');
      expect(input).toHaveValue('John Doe');
    });

    it('displays an error message', () => {
      render(<InputField id="test-input" label="Name" error="Name is required" />);
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    it('forwards the ref correctly', () => {
      const ref = createRef<HTMLInputElement>();
      render(<InputField id="ref-input" label="Ref" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('CheckboxField', () => {
    it('renders successfully and changes state on click', async () => {
      const user = userEvent.setup();
      render(<CheckboxField id="test-checkbox" label="Accept Terms" />);
      
      const checkbox = screen.getByLabelText('Accept Terms');
      expect(checkbox).not.toBeChecked();
      
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('displays an error message', () => {
      render(<CheckboxField id="test-checkbox" label="Terms" error="You must accept" />);
      expect(screen.getByText('You must accept')).toBeInTheDocument();
    });
  });

  describe('SelectField', () => {
    const mockOptions = [
      { value: 'ua', label: 'Ukraine' },
      { value: 'uk', label: 'United Kingdom' }
    ];

    it('renders options and allows making a selection', async () => {
      const user = userEvent.setup();
      render(<SelectField id="test-select" label="Country" options={mockOptions} />);
      
      const select = screen.getByLabelText('Country');
      
      expect(screen.getByRole('option', { name: 'Select...' })).toBeInTheDocument();
      
      await user.selectOptions(select, 'ua');
      expect(select).toHaveValue('ua');
    });

    it('displays an error message', () => {
      render(<SelectField id="test-select" label="Country" options={[]} error="Select a country" />);
      expect(screen.getByText('Select a country')).toBeInTheDocument();
    });
  });

  describe('DatalistField', () => {
    const mockOptions = ['Apple', 'Banana', 'Cherry'];

    it('renders an input with an attached datalist', () => {
      render(<DatalistField id="test-datalist" label="Fruit" options={mockOptions} />);
      
      const input = screen.getByLabelText('Fruit');
      expect(input).toHaveAttribute('list', 'test-datalist-list');
      
      mockOptions.forEach(opt => {
        const optionElement = document.querySelector(`option[value="${opt}"]`);
        expect(optionElement).toBeInTheDocument();
      });
    });

    it('displays an error message', () => {
      render(<DatalistField id="test-datalist" label="Fruit" options={[]} error="Invalid fruit" />);
      expect(screen.getByText('Invalid fruit')).toBeInTheDocument();
    });
  });

});