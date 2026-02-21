import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobForm from "./components/JobForm";
import JobPage from "./pages/JobPage";
import JobDetails from "./pages/JobDetails";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<JobForm />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
