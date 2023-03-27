import axios from "axios";
import { useEffect, useState } from "react";

export function CategoriesSelector({ value, onChange }) {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/categories?q=`).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        console.log(data);
        setCategories(data);
      } else {
        alert(`Aldaa garlaa: ${status}`);
      }
    });
  }, []);

  return (
    <>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Ангилалгүй</option>
        {categories?.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
}
