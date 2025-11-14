import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Lookup} from "./pages/lookup";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Lookup/>
        </QueryClientProvider>
    );
}

export default App;
