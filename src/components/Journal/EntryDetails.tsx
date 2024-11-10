import {useEffect, useState} from "react"
import { db } from "@/config/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useParams } from "react-router-dom"
import styles from "@/styles/modules/Journal/EntryDetails.module.css"
import { useNavigate } from "react-router-dom"




interface EntryDetailsProps {
    entryId: string | null;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({entryId}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [entry, setEntry] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()



    const currentId = entryId || params.id;

    useEffect(() => {

        if(!currentId){
            setLoading(false)
            return;
        } ;



        // Define an async function to fetch the entry from Firestore
        const grabEntry = async () => {
            try {
                // Create a reference to a specific document using the collection path and document ID
                const docRef = doc(db, "journal-entries", currentId)
                
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
    }, [currentId]) // Re-run this effect whenever the id parameter changes

    //Resize Effect
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);

        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    if (loading) {
        return <div>Loading...</div>
    }
    if (!entry) {
        return <div className={styles.noEntryText}>Select a Entry to view</div>
    }


   



    return (
        <>
            <div className={styles.entryDetailsContainer}>
            {isMobile && (
                <button
                onClick={() => navigate('/journal')}
                className={styles.backButton}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                >
                    <path 
                        fillRule="evenodd" 
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                        clipRule="evenodd" 
                    />
                </svg>
                Back to Journal
            </button>
            )}
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
