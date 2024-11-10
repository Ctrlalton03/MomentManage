import {useEffect, useState} from "react"
import { db } from "@/config/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useParams } from "react-router-dom"
import styles from "@/styles/modules/Journal/EntryDetails.module.css"


const EntryDetails = () => {
    const [entry, setEntry] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        // Define an async function to fetch the entry from Firestore
        const grabEntry = async () => {
            try {
                // Create a reference to a specific document using the collection path and document ID
                const docRef = doc(db, "journal-entries", id!)
                
                // Fetch the document data from Firestore
                const docSnap = await getDoc(docRef)

                // Check if the document exists
                if (docSnap.exists()) {
                    // If it exists, update the entry state with the document data
                    // Spread operator (...) combines the document data with the document ID
                    setEntry({id: docSnap.id, ...docSnap.data()})
                }
            } catch (error) {
                // If any error occurs during the fetch, log it to the console
                console.log(error)
            } finally {
                // Whether successful or not, set loading to false when done
                setLoading(false)
            }
        }

        // Immediately invoke the grabEntry function
        grabEntry()
    }, [id]) // Re-run this effect whenever the id parameter changes


    if (loading) {
        return <div>Loading...</div>
    }
    if (!entry) {
        return <div>No entry found</div>
    }





    return (
        <>
            <div className={styles.entryDetailsContainer}>
                <div className={styles.entryDetailsHeaderContainer}>
                    <h2 className={styles.entryDetailsHeader}>Entry Header</h2>
                    <h1 className={styles.entryDetailsTitle}>{entry.title || 'Untitled Entry'}</h1>
                </div>
                <div className={styles.entryDetailsContentContainer}>
                    <h2 className={styles.entryDetailsHeader}>Entry Content</h2>
                    <p className={styles.entryDetailsContent}>{entry.content}</p>
                </div>
            </div>
        
            
        </>
    )
}

export default EntryDetails
