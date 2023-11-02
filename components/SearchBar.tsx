"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchManufacture from "./SearchManufacture";

const SearchButton = ({otherClasses}: {otherClasses: string}) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses} `}  >
    <Image 
    src="/magnifying-glass.svg" 
    alt="Search-icon"
    width={40}
    height={40}
    className="object-contain"
    />
  </button>
)

const SearchBar = () => {
  const [manufacture, setManufacture] = useState('');
  const [model, setModel] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manufacture === '' && model === '') {
      alert('Please fill the search field');
    }
    updateSearchParams(model.toLowerCase(), manufacture.toLowerCase());
  };

  const updateSearchParams = (modelValue: string, manufactureValue: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (modelValue) {
      searchParams.set('model', modelValue);
    } else {
      searchParams.delete('model');
    }

    if (manufactureValue) {
      searchParams.set('manufacture', manufactureValue);
    } else {
      searchParams.delete('manufacture');
    }

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathName);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacture
                manufacture={manufacture}
                setManufacture={setManufacture}
            />
            <SearchButton otherClasses="sm:hidden" />
        </div>
        <div className="searchbar__item">
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='car model'
        />
        <input
          type='text'
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder='Tiguan...'
          className='searchbar__input'
        />
          <SearchButton otherClasses='sm:hidden' />
        </div>
        <SearchButton otherClasses='max-sm:hidden' />
    </form>
  );
}

export default SearchBar