import { useState } from "react";
import Register from "./components/RegisterForm";
import Submitted from "./components/Submitted";

function App() {
  const [complete, setComplete] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleCompleted = (data) => {
    setFormData(data);
    setComplete(true);
  };

  return (
    <>
      {complete ? (
        <Submitted data={formData} />
      ) : (
        <Register completed={handleCompleted} />
      )}
      {/* <Submitted /> */}
    </>
  );
}

export default App;
