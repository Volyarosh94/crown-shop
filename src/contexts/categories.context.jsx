import { createContext, useState, useEffect } from 'react';
import {gql, useQuery} from "@apollo/client";


const COLLECTIONS = gql`
  query GetCollections{
    collections{
    id
    title
    item{
      id
      name
      price
      imageUrl
      }
    }
  }
`

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const {loading, error, data} = useQuery(COLLECTIONS)
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(()=> {
    if(data){
      const { collections } = data
      const collectionsMap = collections.reduce((acc, collection) => {
        const {title, items} = collection
        acc[title.toLowerCase()] = items
        return acc
      },{})
      setCategoriesMap(collectionsMap)
    }

  },[data])

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
