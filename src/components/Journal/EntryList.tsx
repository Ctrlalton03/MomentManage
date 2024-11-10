import { JournalEntry, NewEntryData } from "./journal"
import NewEntryDialog from "@/components/Journal/NewEntryDialog"
import styles from "@/styles/modules/Journal/EntryList.module.css"
import { useAuth } from "@/context/AuthContext"
import { db } from "@/config/firebase"
import { collection, query, orderBy, onSnapshot, where, doc, deleteDoc } from "@firebase/firestore"
import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"
import { Link } from "react-router-dom"



// This component will handle the list of journal entries
interface EntryListProps {
    className?: string
    entries: JournalEntry[]
    onEntryClick: (entry: JournalEntry) => void
    onNewEntry: (entry: NewEntryData) => void
  }

  
  export function EntryList({ entries, onEntryClick, onNewEntry }: EntryListProps) {
    const [localEntries, setLocalEntries] = useState<JournalEntry[]>(entries)
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const { user } = useAuth()

    const handleDelete = async (entryId: string) => {
        // Show confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this project?');
    
        if(!isConfirmed) {
          return;
        }
    
        try {
          // Set deletingId to show loading state
          setDeletingId(entryId);
          // Delete project from Firestore
          await deleteDoc(doc(db, 'journal-entries', entryId));
          alert('Journal entry deleted successfully');
        } catch (error) {
          console.error('Error deleting journal entry:', error);
          alert('Failed to delete Journal Entry');
        } finally {
          // Reset deletingId after operation completes
          setDeletingId(null);
        }
      }

    useEffect(() => {
      const entriesRef = collection(db, "journal-entries");
      const q = query(
          entriesRef,
          where("userId", "==", user?.uid),
          orderBy("createdAt", "desc")
      );
  
      const unsubscribe = onSnapshot(q, (snapshot) => {
          const entriesList = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
          } as JournalEntry));
          setLocalEntries(entriesList);
          setLoading(false);
      });
  
      return () => unsubscribe();
  }, []);
    return (
      <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Entries</h1>
                <NewEntryDialog onNewEntry={onNewEntry}/>
            </div> 
            <div className={styles.entriesList}>
                {loading ? (
                    <p>Loading Entries...</p>
                ): localEntries.length === 0 ? (
                    <p className={styles.noEntries}>No entries found</p>
                ): (
                    <ul className={styles.entriesList}>
                        {localEntries.map((entry) => (
                            <li key={entry.id} className={styles.entryItem}>
                                <Link 
                                    to={`/journal/${entry.id}`}
                                    className={styles.entryTitle}
                                    onClick={() => onEntryClick(entry)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <h2>{entry.title}</h2>
                                </Link>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(entry.id);
                                    }}
                                    className="text-red-500 hover:text-red-600"
                                    disabled={deletingId === entry.id}
                                >
                                    {deletingId === entry.id ? (
                                        <span className="animate-spin">🔄</span>
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
      </div>
    )
  }
  
  export default EntryList