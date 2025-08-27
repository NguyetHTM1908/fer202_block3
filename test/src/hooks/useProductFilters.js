import { useMemo } from 'react';

export const useProductFilters = (products, searchQuery, sortBy, filterBy) => {
  return useMemo(() => {
    let filtered = products;
    const q = (searchQuery || '').trim().toLowerCase();

    if (q) {
      filtered = filtered.filter(p =>
        (p.name || p.title || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      );
    }

    if (filterBy && filterBy !== 'all') {
      filtered = filtered.filter(
        p => (p.category || '').toLowerCase() === filterBy.toLowerCase()
      );
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case 'name-asc':  sorted.sort((a,b)=>(a.name||a.title||'').localeCompare(b.name||b.title||'')); break;
      case 'name-desc': sorted.sort((a,b)=>(b.name||b.title||'').localeCompare(a.name||a.title||'')); break;
      case 'price-asc': sorted.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price)); break;
      case 'price-desc':sorted.sort((a,b)=>parseFloat(b.price)-parseFloat(a.price)); break;
      default: break;
    }
    return sorted;
  }, [products, searchQuery, sortBy, filterBy]);
};
