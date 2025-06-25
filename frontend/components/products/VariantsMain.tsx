"use client";
import { SortEnum } from '@/enums/sort.enum';
import CategoryService from '@/services/category.service';
import VariantService from '@/services/variant.service';
import { Category } from '@/types/category.types';
import { Variant } from '@/types/variant.types';
import { FilterOutlined, SlidersOutlined } from '@ant-design/icons';
import { Button, Checkbox, Dropdown, Menu } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import LoaderOverlay from '../common/Loader/LoaderOverlay';
import Pagination from '../common/Pagination/Pagination';
import VariantCard from '../common/VariantCard/VariantCard';
import './variants.css';
import { MsgEnum } from '@/enums/message-enum';
import { message } from '../common/message/message';

const sortOptions = [
    { label: 'PRICE: LOW to HIGH', value: 'LOW_HIGH' },
    { label: 'PRICE: HIGH to LOW', value: 'HIGH_LOW' },
];

// export const dynamic = 'force-dynamic';

const VariantsMain = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Initialize state from query parameters
    const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
        const categoryIds = searchParams.get('categoryId');
        return categoryIds ? categoryIds.split(',').filter(Boolean) : [];
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [sort, setSort] = useState<string>(() => searchParams.get('sort') || '');
    const [isBestSeller, setIsBestSeller] = useState<boolean>(() => searchParams.get('bestSeller') === 'true');
    const [page, setPage] = useState<number>(0);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [variantsLoading, setVariantsLoading] = useState<boolean>(true);
    const [totalElements, setTotalElements] = useState<number>();

    // Update URL query parameters
    const updateQueryParams = useCallback((updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === '') {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        
        // Reset page when filters change
        params.delete('page');
        
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.push(newUrl, { scroll: false });
    }, [searchParams, router]);

    const handleSortChange = ({ key }: { key: string }) => {
        setPage(0);
        setSort(key);
        updateQueryParams({ sort: key });
    };

    const handleBestSellerChange = (e: any) => {
        setPage(0);
        const newValue = e.target.checked;
        setIsBestSeller(newValue);
        updateQueryParams({ bestSeller: newValue ? 'true' : null });
    };

    const handleCategoryChange = (checkedValue: any[]) => {
        setPage(0);
        setSelectedCategories(checkedValue);
        updateQueryParams({ categoryId: checkedValue.length > 0 ? checkedValue.join(',') : null });
    };

    const fetchCategories = () => {
        CategoryService.fetchCategories()
            .then((response) => {
                setCategories(response?.data)
            })
            .catch((error) => {
                console.error('Error while fetching categories.', error);
                message.open({ text: error.response.data.message || 'Error while fetching categories.', type: MsgEnum.ERROR });
            });
    };

    const fetchVariants = () => { 
        setVariantsLoading(true);
        let sortFilter: SortEnum | undefined;
        if (sort !== '') {
            sortFilter = sort === 'LOW_HIGH' ? SortEnum.ASC : SortEnum.DESC;
        }
        const filters = {
            ...(selectedCategories.length > 0 && {categoryIds: selectedCategories}),
            bestSeller: isBestSeller,
            sort: sortFilter
        };

        VariantService.fetchVariants(filters, page)
            .then((response) => {
                setVariants(response?.data)
                setTotalElements(response?.totalElements);
            })
            .catch((error) => {
                console.error('Error while fetching variants.', error);
                message.open({ text: error.response.data.message || 'Error while fetching variants.', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setVariantsLoading(false);
            });
    };

    // Handle page changes with URL updates
    const handlePageChange = useCallback((newPage: React.SetStateAction<number>) => {
        const pageNumber = typeof newPage === 'function' ? newPage(page) : newPage;
        setPage(pageNumber);
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.push(newUrl, { scroll: false });
    }, [page, searchParams, router]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchVariants();
    }, [sort, selectedCategories, isBestSeller, page]);

    // Antd Menus for Dropdowns using items prop instead of children
    const categoryMenu = (
        <Menu
            items={[
                {
                    key: 'category-header',
                    label: 'Select Categories',
                    disabled: true,
                    style: { background: '#f5f5f5', fontWeight: 600 }
                },
                {
                    key: 'category-checkboxes',
                    label: (
                        <div style={{ maxHeight: 250, overflowY: 'auto', padding: 8 }}>
                            {categories && (
                                <Checkbox.Group
                                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                                    value={selectedCategories}
                                    onChange={handleCategoryChange}
                                >
                                    {categories.map((category) => (
                                        <Checkbox key={category.id} value={category.id}>{category.description}</Checkbox>
                                    ))}
                                </Checkbox.Group>
                            )}
                        </div>
                    ),
                    style: { padding: 0 }
                },
                {
                    key: 'bestseller-header',
                    label: 'Select Best Sellers',
                    disabled: true,
                    style: { background: '#f5f5f5', fontWeight: 600 }
                },
                {
                    key: 'bestseller-checkbox',
                    label: <Checkbox checked={isBestSeller} onChange={handleBestSellerChange}>Best Sellers</Checkbox>,
                    style: { padding: 8 }
                }
            ]}
        />
    );


    return(
        <div className="p-5 sm:p-10 flex flex-col gap-5">
            {/* Filter Options */}
            <div className="flex gap-3 flex-wrap">
                {/* Category Filter */}
                <Dropdown menu={{ items: categoryMenu.props.items }} trigger={['click']} placement="bottomLeft">
                    <Button className="w-[180px] flex justify-between items-center bg-[#e6e6e6]">
                        <FilterOutlined /> CATEGORY 
                    </Button>
                </Dropdown>

                {/* Sort Filter */}
                <Dropdown 
                    menu={{
                        items: [
                          {
                            key: 'sort-header',
                            label: 'SORT BY',
                            disabled: true,
                            style: { background: '#f5f5f5', fontWeight: 600 }
                          },
                          ...sortOptions.map(option => ({
                            key: option.value,
                            label: option.label
                          }))
                        ],
                        onClick: handleSortChange,
                        selectedKeys: [sort]
                    }}
                    trigger={['click']} 
                    placement="bottomLeft"
                >
                    <Button className="w-[180px] flex justify-between items-center bg-white border border-[#2d394b] text-[#2d394b]">
                        <SlidersOutlined /> {sortOptions.find(opt => opt.value === sort)?.label || 'SORT BY'} 
                    </Button>
                </Dropdown>
            </div>
            

            {/* ALL Products */}
            <div className="w-full">
                {/* Products List*/}
                <div className="py-5 products_main gap-[24px]">
                    {!variantsLoading && variants.length === 0 && (
                        <p className="text-xl text-center text-gray-500">No more products</p>
                    )}
                    {!variantsLoading && variants.length > 0 && variants.map((variant) => (
                        <VariantCard key={variant.id} variant={variant} />
                    ))}
                </div>

                {/* Pagination */}
                {totalElements && (
                    <Pagination page={page} setPage={handlePageChange} data={variants} totalElements={totalElements}/>
                )}
            </div>

            {variantsLoading && <LoaderOverlay />}
        </div>
    )
}

export default VariantsMain;