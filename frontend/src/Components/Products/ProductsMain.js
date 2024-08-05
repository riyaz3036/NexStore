"use client";
import './products.css';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import { BASE_URL } from '@/utils/config';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductsMain({categories,categoryError,id}){
    // For toggling dropdowns
    const [categoryDropdown, setCategoryDropdown] = useState(0);
    const [bestsellerDropdown, setBestsellerDropdown] = useState(0);
    
    // To handle sorting and best seller
    const [sort, setSort] = useState('');
    const [isBestSeller, setIsBestSeller] = useState(false);
    const handleSortChange = (event) => {
        setPage(1);
        setSort(event.target.value);
    };
    const handleBestSellerChange = () => {
        setPage(1);
        setIsBestSeller((prev) => !prev);
    };

    // To handle category filters
    const initialCategories = id !== 'all' ? [id] : [];
    const [selectedCategories, setSelectedCategories] = useState(initialCategories);
    const handleCategoryChange = (categoryId) => {
        setPage(1);
        setSelectedCategories((prev) =>
          prev.includes(categoryId)
            ? prev.filter((id) => id !== categoryId)
            : [...prev, categoryId]
        );
    };

    // Pagination and fetching products list
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [productsError, setProductsError] = useState('');
    const [productsLoading, setProductsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const categoriesParam = selectedCategories.join(',');
                const response = await fetch(`${BASE_URL}/variant/?sort=${sort}&best_seller=${isBestSeller}&page=${page}&category=${categoriesParam}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setProductsError('Error loading data');
            } finally {
                setProductsLoading(false);
            }
        };
        fetchProducts();
    }, [sort, selectedCategories, isBestSeller, page]);

    const handleNextPage = () => {
        if(products.length>0) {
            setPage((prevPage) => prevPage + 1);
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };


    return(
        <div className="p-5 sm:p-10 flex flex-wrap lg:flex-nowrap gap-5">
            {/* Filter Options */}
            <div className="">
                {/* Category Filters */} 
                <div className="w-[180px]">
                    <div onClick={() => { setCategoryDropdown(!categoryDropdown) }} className="w-full bg-[#e6e6e6] flex items-center justify-between p-2 cursor-pointer">
                        <p>CATEGORY</p>
                        <i className="ri-arrow-down-s-fill"></i>
                    </div>
                    {
                        categoryDropdown ? (
                            <div>
                                {categoryError && <p className="p-5 text-xl text-center text-gray-500">{categoryError}</p>}
                                {!categoryError && categories.map((category) => (
                                    <div key={category._id} className="flex items-center mb-1 py-1">
                                        <input
                                            type="checkbox"
                                            id={category._id}
                                            checked={selectedCategories.includes(category._id)}
                                            onChange={() => handleCategoryChange(category._id)}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <label htmlFor={category._id} className="text-sm">
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ) : (null)
                    }
                </div>
                {/* Best seller Filter */}
                <div className="w-[180px]">
                    <div onClick={() => { setBestsellerDropdown(!bestsellerDropdown) }} className="w-full bg-[#e6e6e6] flex items-center justify-between p-2 cursor-pointer">
                        <p>BEST SELLERS</p>
                        <i className="ri-arrow-down-s-fill"></i>
                    </div>
                    {
                        bestsellerDropdown ? (
                            <div>
                                <input type="checkbox" id="best-seller" checked={isBestSeller} onChange={handleBestSellerChange} className="mr-2 cursor-pointer" />
                                <label htmlFor="best-seller" className="text-sm">BEST SELLERS</label>
                            </div>
                        ) : (null)
                    }
                </div>
            </div>

            {/* ALL Products */}
            <div className="w-full">
                {/* Sort Options */}
                <div className="flex flex-wrap items-center justify-end gap-3">
                    <div className="relative inline-block text-left">
                        <select
                            className="bg-white border border-[#2d394b] text-sm text-[#2d394b] flex items-center justify-center focus:outline-none w-[200px] h-[30px] sm:h-[40px]"
                            value={sort}
                            onChange={handleSortChange}
                        >
                            <option className="text-sm bg-white" value="" disabled>SORT BY</option>
                            <option className="text-sm" value="LOW_HIGH">PRICE: LOW to HIGH</option>
                            <option className="text-sm" value="HIGH_LOW">PRICE: HIGH to LOW</option>
                        </select>
                    </div>
                </div>

                {/* Products List*/}
                <div className="products_main py-5">
                    {productsLoading && <p className="text-xl text-center text-gray-500">Loading...</p>}
                    {productsError && <p className="text-xl text-center text-gray-500">{productsError}</p>}
                    {!productsError && !productsLoading && products.length === 0 && (
                        <p className="text-xl text-center text-gray-500">No more products</p>
                    )}
                    {!productsError && !productsLoading && products.length > 0 && products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-3 py-5">
                    <button onClick={handlePrevPage} className="px-4 py-2 bg-[#2d394b] text-white rounded">Previous</button>
                    <div className="bg-[#6689ff] text-white px-5 py-2"><p>{page}</p></div>
                    <button onClick={handleNextPage} className="px-4 py-2 bg-[#2d394b] text-white rounded">Next</button>
                </div>
            </div>
        </div>
    )
}