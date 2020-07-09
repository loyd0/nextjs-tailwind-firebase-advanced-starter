
import { useQuery } from './helpers';
/**** ITEMS ****/
/* Example query functions (modify to your needs) */

// Fetch all items by owner
export function useItemsByOwner(owner) {
    return useQuery(
      owner && firestore.collection("items").where("owner", "==", owner)
    );
  }
  
  // Fetch item data
  export function useItem(id) {
    return useQuery(id && firestore.collection("items").doc(id));
  }
  
  // Update an item
  export function updateItem(id, data) {
    return firestore.collection("items").doc(id).update(data);
  }
  
  // Create a new item
  export function createItem(data) {
    return firestore.collection("items").add(data);
  }