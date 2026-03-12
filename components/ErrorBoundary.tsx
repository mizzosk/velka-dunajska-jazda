import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  static displayName = 'ErrorBoundary';

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-stone-900 mb-4">Ups! Niečo sa pokazilo.</h1>
            <p className="text-stone-600 mb-6">
              Nastala neočakávaná chyba. Skúste obnoviť stránku.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-danube-600 text-white rounded-lg hover:bg-danube-700 transition-colors"
            >
              Obnoviť stránku
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
