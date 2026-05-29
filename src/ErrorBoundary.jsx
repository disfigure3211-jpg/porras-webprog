import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // You can also log errors to an external service here
    // console.error(error, info);
  }

  render() {
    const { error, info } = this.state;
    if (error) {
      return (
        <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
          <h1 style={{ color: '#b91c1c' }}>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#111827', color: '#f8fafc', padding: 12, borderRadius: 6 }}>
            {error && error.toString()}
            {info && info.componentStack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
