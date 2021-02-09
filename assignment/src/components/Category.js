import { useCallback, useState } from "react";

export const Category = ({
  categories,
  objIndex,
  setCategories,
  fullCategories,
}) => {
  const [editCategory, setEditCategory] = useState(false);

  const textToChange = useCallback(
    (e, setCategories) => {
      const categoriesCopy = [...fullCategories];
      categoriesCopy[objIndex].text = e.target.value;
      setCategories(categoriesCopy);
    },
    [setCategories, categories, fullCategories]
  );

  const removeCategory = useCallback(() => {
    const categoriesCopy = [...fullCategories];
    setCategories(categoriesCopy.filter((_, index) => objIndex !== index));
  }, [setCategories, categories, fullCategories]);

  const addCategory = useCallback(() => {
    if (objIndex === fullCategories.length - 1) {
      setCategories((state) => [...state, { text: "New Category" }]);
    } else {
      const categoriesCopy = [...fullCategories];
      setCategories([
        ...categoriesCopy.slice(0, objIndex + 1),
        ...[{ text: "New Category" }],
        ...categoriesCopy.slice(objIndex + 1),
      ]);
    }
  }, [setCategories, categories, fullCategories]);

  const nestedCategories = (
    categories,
    objIndex,
    setCategories,
    fullCategories
  ) => {
    if (categories.length > 1) {
      categories.slice(1);
      return (
        <Category
          categories={categories.slice(1)}
          objIndex={objIndex + 1}
          setCategories={setCategories}
          fullCategories={fullCategories}
        />
      );
    }
  };

  return (
    <>
      <div style={{ marginLeft: "25px", marginTop: "10px" }}>
        <div className="d-flex flex-row border">
          <div className="mr-auto p-2 text-primary">
            {editCategory ? (
              <input
                className="form-control"
                onChange={(e) => textToChange(e, setCategories)}
                value={categories[0].text}
                name={objIndex}
              />
            ) : (
              <p className="h3">{categories[0].text}</p>
            )}
          </div>
          <div className="p-2">
            {editCategory ? (
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => setEditCategory(false)}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setEditCategory(true)}
              >
                Edit
              </button>
            )}
          </div>
          <div className="p-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={addCategory}
            >
              Add
            </button>
          </div>
          <div className="p-2">
            <button
              type="button"
              className="btn btn-danger"
              style={{ visibility: objIndex === 0 ? "hidden" : "visible" }}
              onClick={removeCategory}
            >
              Remove
            </button>
          </div>
        </div>

        {nestedCategories(categories, objIndex, setCategories, fullCategories)}
      </div>
    </>
  );
};
