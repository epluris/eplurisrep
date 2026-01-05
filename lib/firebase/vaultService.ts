import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    query, 
    where,
    orderBy,
    Timestamp 
  } from "firebase/firestore";
  import { db } from "./config";
  
  // Types for Vault documents
  export interface VaultDocument {
    id?: string;
    userId: string;
    title: string;
    description: string;
    source: 'data.gov' | 'archives.gov' | 'congress.gov' | 'state' | 'other';
    sourceUrl: string;
    fileUrl?: string;
    fileType?: 'pdf' | 'csv' | 'json' | 'xml' | 'txt' | 'other';
    tags: string[];
    notes?: string;
    savedAt: Timestamp;
    metadata?: {
      originalId?: string;
      agency?: string;
      publishedDate?: string;
      pageCount?: number;
    };
  }
  
  // Save a document to user's vault
  export async function saveToVault(userId: string, document: Omit<VaultDocument, 'userId' | 'savedAt'>) {
    try {
      const vaultRef = collection(db, "userVaults", userId, "documents");
      const docRef = doc(vaultRef);
      
      const vaultDoc: VaultDocument = {
        ...document,
        id: docRef.id,
        userId,
        savedAt: Timestamp.now()
      };
      
      await setDoc(docRef, vaultDoc);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error saving to vault:", error);
      return { success: false, error };
    }
  }
  
  // Get all documents from user's vault
  export async function getVaultDocuments(userId: string) {
    try {
      const vaultRef = collection(db, "userVaults", userId, "documents");
      const q = query(vaultRef, orderBy("savedAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const documents: VaultDocument[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() } as VaultDocument);
      });
      
      return { success: true, documents };
    } catch (error) {
      console.error("Error getting vault documents:", error);
      return { success: false, error, documents: [] };
    }
  }
  
  // Get a single document from vault
  export async function getVaultDocument(userId: string, documentId: string) {
    try {
      const docRef = doc(db, "userVaults", userId, "documents", documentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { success: true, document: { id: docSnap.id, ...docSnap.data() } as VaultDocument };
      } else {
        return { success: false, error: "Document not found" };
      }
    } catch (error) {
      console.error("Error getting vault document:", error);
      return { success: false, error };
    }
  }
  
  // Update a document in vault
  export async function updateVaultDocument(
    userId: string, 
    documentId: string, 
    updates: Partial<VaultDocument>
  ) {
    try {
      const docRef = doc(db, "userVaults", userId, "documents", documentId);
      await updateDoc(docRef, updates);
      return { success: true };
    } catch (error) {
      console.error("Error updating vault document:", error);
      return { success: false, error };
    }
  }
  
  // Delete a document from vault
  export async function deleteVaultDocument(userId: string, documentId: string) {
    try {
      const docRef = doc(db, "userVaults", userId, "documents", documentId);
      await deleteDoc(docRef);
      return { success: true };
    } catch (error) {
      console.error("Error deleting vault document:", error);
      return { success: false, error };
    }
  }
  
  // Search documents in vault by tags or title
  export async function searchVault(userId: string, searchTerm: string) {
    try {
      const vaultRef = collection(db, "userVaults", userId, "documents");
      const querySnapshot = await getDocs(vaultRef);
      
      const documents: VaultDocument[] = [];
      const searchLower = searchTerm.toLowerCase();
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as VaultDocument;
        const matches = 
          data.title.toLowerCase().includes(searchLower) ||
          data.description.toLowerCase().includes(searchLower) ||
          data.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          data.notes?.toLowerCase().includes(searchLower);
        
        if (matches) {
          documents.push({ id: doc.id, ...data });
        }
      });
      
      return { success: true, documents };
    } catch (error) {
      console.error("Error searching vault:", error);
      return { success: false, error, documents: [] };
    }
  }
  
  // Get document statistics
  export async function getVaultStats(userId: string) {
    try {
      const vaultRef = collection(db, "userVaults", userId, "documents");
      const querySnapshot = await getDocs(vaultRef);
      
      let totalDocuments = 0;
      const tags: Set<string> = new Set();
      const sources: Record<string, number> = {};
      let totalSize = 0; // In bytes (would need actual file storage)
      
      querySnapshot.forEach((doc) => {
        totalDocuments++;
        const data = doc.data() as VaultDocument;
        
        // Count tags
        data.tags.forEach(tag => tags.add(tag));
        
        // Count sources
        sources[data.source] = (sources[data.source] || 0) + 1;
      });
      
      return {
        success: true,
        stats: {
          totalDocuments,
          totalTags: tags.size,
          sources,
          lastUpdated: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error("Error getting vault stats:", error);
      return { success: false, error };
    }
  }
  