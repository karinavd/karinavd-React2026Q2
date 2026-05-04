import { Component } from 'react';
import './App.css';
import type { AppState } from './interfaces/AppState';
import type { ItemProps } from './interfaces/ItemProps';
import { Search } from './components/Search';
import { CardList } from './components/CardList';

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      error: null,
      isError: false,
    };
  }
  fetchData = async (item: string) => {
    this.setState({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await fetch(`https://swapi.info/api/people`).then((res) =>
        res.json()
      );
      const filteredCharacters = item
        ? res.filter((char: ItemProps) =>
            char.name.toLowerCase().includes(item.toLowerCase())
          )
        : res;
      const characterData: ItemProps[] = filteredCharacters.map(
        (character: ItemProps) => ({
          id: character.name,
          name: character.name,
          height: character.height,
          mass: character.mass,
          hair_color: character.hair_color,
          skin_color: character.skin_color,
          eye_color: character.eye_color,
          birth_year: character.birth_year,
          gender: character.gender,
          url: character.url,
        })
      );
      this.setState({ items: characterData, isLoading: false });
    } catch (e) {
      const err = e instanceof Error ? e.message : 'Unknown error';
      this.setState({ error: err, isLoading: false });
    }
  };
  componentDidMount() {
    const storageItem = localStorage.getItem('savedSearchItem') || '';
    this.fetchData(storageItem);
  }

  handleSearch = (item: string) => {
    this.fetchData(item);
  };
  triggerErr = () => {
    this.setState({ isError: true });
  };
  render() {
    if (this.state.isError)
      throw new Error(
        'This is a test critical error for checking ErrorBoundary!'
      );
    return (
      <div className="bg-[#131212] min-h-screen w-full text-white">
        <header className="w-full p-4 bg-[#131212] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] text-white flex items-center justify-between">
          <h1 className="text-[35px]">Star wars</h1>
          <Search
            onSearch={this.handleSearch}
            isLoading={this.state.isLoading}
          />
        </header>

        <main className="overflow-y-auto h-[80vh]">
          <CardList
            items={this.state.items}
            isLoading={this.state.isLoading}
            error={this.state.error}
          />
        </main>
        <footer className="flex items-center w-full justify-center h-15  border-t-4">
          <button
            className="bg-white min-w-20 cursor-pointer rounded-[5px] text-black p-1"
            onClick={this.triggerErr}
          >
            Error button
          </button>
        </footer>
      </div>
    );
  }
}

export default App;
