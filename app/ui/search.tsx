'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'


import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ placeholder }: { placeholder: string }) {
  //useSearchParams --> allows you to access the parameters of the current URL. /dashboard/invoices?page=1&query=pending --> {page: '1', query: 'pending'}
  const searchParams = useSearchParams()
  //usePathname --> allows you to read the current URL's pathname. '/dashboard/invoices'
  const pathname = usePathname()
  //useRoter enables navigation between routes within client components programmatically.
  const { replace } = useRouter()

  //First - capture the user's input
  //Second - update the URL with the search params
  //Third - Keep the URL in sync with the input field
  //Fourth - update the table to reflect the search query

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if(term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
    console.log(term)
  }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => { 
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
