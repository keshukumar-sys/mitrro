// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// interface Category {
//   _id: string;
//   categoryTitle: string;
//   categoryImage: string;
// }

// export default function Categories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         // ✅ CORRECT ENDPOINT
//         const res = await axios.get(
//           `${BACKEND_URL}/api/categories/categories`
//         );

//         setCategories(res.data.categories || []);
//       } catch (error) {
//         console.error("Failed to fetch categories", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) {
//     return (
//       <p className="text-center py-6 text-muted-foreground">
//         Loading categories...
//       </p>
//     );
//   }

//   return (
//     <div className="py-6 px-4 bg-white">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">
//         Categories
//       </h2>

//       <div className="flex overflow-x-auto space-x-4 scrollbar-hide py-2">
//         {categories.map(category => (
//           <div
//             key={category._id}
//             className="flex-shrink-0 w-32 sm:w-36 md:w-40 lg:w-44 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform cursor-pointer text-center"
//             onClick={() =>
//               navigate(
//                 `/products?category=${encodeURIComponent(
//                   category.categoryTitle
//                 )}`
//               )
//             }
//           >
//             <img
//               src={category.categoryImage || "/placeholder.png"}
//               alt={category.categoryTitle}
//               className="w-16 h-16 sm:w-20 sm:h-20 mx-auto object-contain mb-2"
//             />
//             <p className="text-sm sm:text-base font-medium text-gray-700">
//               {category.categoryTitle}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Category {
  _id: string;
  categoryTitle: string;
  categoryImage: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/categories/categories`
        );

        console.log("Categories Response:", res.data);

        setCategories(res.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <p className="text-center py-6 text-muted-foreground">
        Loading categories...
      </p>
    );
  }

  return (
    <div className="py-6 px-4 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Categories
      </h2>

      <div className="relative">

        
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border shadow rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>


        <div
          ref={scrollRef}
          className="flex gap-4 overflow-hidden px-10"
        >
          {categories.map((category) => (
            <div
              key={category._id}
              className="min-w-[140px] p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform cursor-pointer text-center"
              onClick={() =>
                navigate(
                  `/products?category=${encodeURIComponent(
                    category.categoryTitle
                  )}`
                )
              }
            >
              <img
                src={category.categoryImage || "/placeholder.png"}
                alt={category.categoryTitle}
                className="w-16 h-16 mx-auto object-contain mb-2"
              />

              <p className="text-sm font-medium text-gray-700">
                {category.categoryTitle}
              </p>
            </div>
          ))}
        </div>

    
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border shadow rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

      </div>
    </div>
  );
}
