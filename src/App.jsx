import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from "react-router";
import { router } from './router/router.js';

function App() {

  //react-query 설정
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry : 1,
        staleTime: 1 * 60 * 1000,
        gcTime: 1 * 60 * 1000,
        refetchOnWindowFocus: true //포커스를 다시 받았을 때 재실행 여부
      }
    }
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
