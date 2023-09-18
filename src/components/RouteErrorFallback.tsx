import Button from '@/components/Button';

const RouteErrorFallback = () => {
  return (
    <div className="error-page">
      <h1>Something went wrong.</h1>
      <p>
        Sorry, an unexpected error occurred. Please refresh and try again.
      </p>
      <button onClick={() => window.location.reload()} > Refresh</button>
    </div>
  );
}

export default RouteErrorFallback;