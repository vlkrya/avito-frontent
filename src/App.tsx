import { useGetGamesQuery } from './store';

function App() {
  const { data } = useGetGamesQuery({});

  console.log('data', data);
  return <>Test app!</>;
}

export default App;
