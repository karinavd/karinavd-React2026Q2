import {
  Component,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import type { PropsSearch } from '../interfaces/PropsSearch';
import type { SearchState } from '../interfaces/StateSearch';

export class Search extends Component<PropsSearch, SearchState> {
  constructor(props: PropsSearch) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }
  componentDidMount(): void {
    const item = localStorage.getItem('savedSearchItem');
    if (item) this.setState({ searchTerm: item });
  }
  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };
  handleForm = (e: FormEvent) => {
    e.preventDefault();
    const trimmedItem = this.state.searchTerm.trim();
    this.setState({ searchTerm: trimmedItem });
    localStorage.setItem('savedSearchItem', trimmedItem);
    this.props.onSearch(trimmedItem);
  };
  render(): ReactNode {
    return (
      <form onSubmit={this.handleForm} className="flex gap-3">
        <input
          className="bg-white text-black rounded-[5px] pl-2 h-7"
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInput}
          disabled={this.props.isLoading}
          placeholder="Enter your request"
        />
        <button
          type="submit"
          className="bg-white min-w-20 cursor-pointer rounded-[5px] text-black"
          disabled={this.props.isLoading}
        >
          {this.props.isLoading ? 'Wait' : 'Search'}
        </button>
      </form>
    );
  }
}
