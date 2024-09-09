// pages/index.tsx
import { useState, FormEvent } from 'react';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleQuerySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Query Interface</h1>
      <form onSubmit={handleQuerySubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything..."
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {response && <p>AI Response: {response}</p>}
    </div>
  );
}
