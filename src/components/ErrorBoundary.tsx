import { Component, type ErrorInfo } from 'react';
import type { Props } from '../interfaces/Props';
import type { State } from '../interfaces/State';

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error occurred:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
          <h1 className="text-3xl">Something went wrong.</h1>
          <button
            className="border-2 font-bold border-black rounded-[5px] p-2 cursor-pointer hover:bg-blue-100"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
