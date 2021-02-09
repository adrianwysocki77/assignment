import { useState } from "react";
import { Category } from "./components/Category";

function App() {
  const [categories, setCategories] = useState([
    {
      text: "Category article 1",
    },
  ]);
  return (
    <div className={`container`}>
      <Category
        categories={categories}
        objIndex={0}
        setCategories={setCategories}
        fullCategories={categories}
      />
    </div>
  );
}

export default App;
