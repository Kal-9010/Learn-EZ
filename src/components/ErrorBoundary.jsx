import { Component } from 'react';

// Required by the coding standard: every AI-dependent component gets an
// error boundary, since a malformed/thrown Groq response should never take
// down the whole learning flow.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info?.componentStack || '');
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-sm text-slate-500">
              Something went wrong loading this. Please refresh and try again.
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
