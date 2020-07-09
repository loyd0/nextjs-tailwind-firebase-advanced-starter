/**** HELPERS ****/
import { useState, useEffect, useRef } from 'react'
// Custom React hook that subscribes to a Firestore query


export const fetchRequest = async (url, data, method = "POST" ) => {
  // Handle not being used on the server side
  if (typeof window === "undefined") {
    return new Error("Trying to use browser side fetch on the server")
  }

  try {
    return fetch(url, {
      method: method,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(data)
    }).then((res) => {
      if (!res.ok) {
        return {
          code: "Authentication/Error Validating Request",
          message: "Please check your validation",
        }
      }

      console.log('returning data from fetch request')
      return res.json()
    }).catch(error => {
      return {
        code: "API/Request Error",
        message: "Please check with an admin", 
        error
      }
    })

  } catch (error) {
    return {
      code: "API/Request Error",
      message: "Please check with an admin",
      error
    }
  }

}







export function useQuery(query) {
  const [queryState, setQueryState] = useState({
    status: "loading",
    data: undefined,
    error: null,
  });

  // Gives us previous query object if query is the same
  // ensuring we don't unsubscribe and resubscribe below.
  const queryCached = useQueryCache(query);

  useEffect(() => {
    // Skip if falsy value, as that allows us to wait on needed
    // needed data before constructing query and passing it into useQuery.
    if (queryCached) {
      return queryCached.onSnapshot(
        (response) => {
          // Get data for collection or doc
          const data = response.docs
            ? getCollectionData(response)
            : getDocData(response);

          setQueryState({
            status: "success",
            data: data,
            error: null,
          });
        },
        (error) => {
          setQueryState((state) => ({
            status: "error",
            data: state.data,
            error: error,
          }));
        }
      );
    }
  }, [queryCached]);

  return queryState;
}

// Get doc data
export function getDocData(doc) {
  return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}

// Get array of doc data from collection
export function getCollectionData(collection) {
  return collection.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

function useQueryCache(query) {
  // Ref for storing previous query object
  const previousRef = useRef();
  const previous = previousRef.current;

  // Determine if query object is equal to previous
  const isEqual =
    (!previous && !query) || (previous && query && previous.isEqual(query));

  // If not equal update previous to query (for next render)
  // and then return new query below.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = query;
    }
  });

  return isEqual ? previous : query;
}