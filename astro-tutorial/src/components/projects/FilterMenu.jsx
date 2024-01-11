import {useState} from "react"
import { TbChevronUp, TbChevronDown, TbX } from "react-icons/tb";

import { useFilterMenuContext } from './context/FilterMenuContext';
import { useTagsContext } from "./context/TagsContext";
import { capitalizeTag } from "../../utils/tagManipulation";

export default function FilterMenu({uniqueTags}){
  const { filterMenuVisible, toggleFilterMenu } = useFilterMenuContext();
  const { selectedTags, handleTagSelection, handleReset } = useTagsContext();

  const [categoryVisibility, setCategoryVisibility] = useState(() => {
    const initialVisibility = {};
    Object.keys(uniqueTags).forEach((key) => {
      initialVisibility[key] = true;
    });
    return initialVisibility;
  });

  const toggleCategoryVisibility = (categoryKey) => {
    setCategoryVisibility((prevVisibility) => ({
      ...prevVisibility,
      [categoryKey]: !prevVisibility[categoryKey],
    }));
  };

  return (
    <div className={`${filterMenuVisible ? 'flex translate-x-0' : 'translate-x-full'} z-50 fixed md:static top-0 right-0 md:translate-x-0 transition-transform duration-500 md:col-start-1 col-span-1 w-full max-h-screen md:max-h-full flex-col p-4 bg-white border-gray-200 border-2 rounded-lg`}>
      <button
        className="md:hidden self-end m-2 btn-tertiary"
        onClick={()=>toggleFilterMenu()}
      >
        <TbX/>
      </button>
      <div className="overflow-y-scroll md:overflow-hidden p-2"> 
        {Object.keys(uniqueTags).map(key => (
          <div 
            className='mb-4'
            key={`tagCategory-${key}`}
          >
            <h3 
                className='cursor-pointer font-bold border-b-2 flex items-center justify-between py-2'
                onClick={() => toggleCategoryVisibility(key)}
            >
                {key.toUpperCase()}
                {categoryVisibility[key] ? 
                  <TbChevronUp/> :
                  <TbChevronDown/>
                }
            </h3>
            <ul 
              className={`flex flex-col flex-nowrap ${!categoryVisibility[key] && "hidden"}`}
            >
              {uniqueTags[key].map(individualTag => {
                const normalizedTag = capitalizeTag(individualTag)
                return (
                <li
                    key={individualTag}
                    className={`cursor-pointer ml-2 my-1 self-start ${selectedTags.includes(normalizedTag) ? 'selected' : ''}`}
                    onClick={() => handleTagSelection(normalizedTag)}
                >
                    {normalizedTag}
                </li>
              )})}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="flex self-center gap-4 py-4">
        <button 
          className="btn"
          onClick={()=>handleReset()}
        >
            Reset
        </button>
        <button 
          className="btn-primary md:hidden"
          onClick={()=>toggleFilterMenu()}
        >
            View projects
        </button>
      </div>
      
    </div>
  )
  

}
