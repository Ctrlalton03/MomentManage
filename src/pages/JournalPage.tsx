import JournalHeader from "@/components/Journal/JournalHeader"
import { useNavigate } from "react-router-dom"
import styles from "@/styles/modules/pages/JournalPage.module.css"
import EntryList from "@/components/Journal/EntryList"
import { JournalEntry, NewEntryData } from "@/components/Journal/journal"
import EntryDetails from "@/components/Journal/EntryDetails"
const JournalPage: React.FC = () => {
    // Implement state management:
    
    
    // - mobile detection
    
    // Implement handlers:
    const navigate = useNavigate();
    const handleNewEntry = (entry: NewEntryData) => {
        console.log('New entry created:', entry);
        // Handle the new entry
    };

    const handleEntryClick = (entry: JournalEntry) => {
        console.log('Entry clicked:', entry);
        // Handle entry click
    };



    return (
        <div className={styles.container}>
            <JournalHeader />
            <button
                onClick={() => navigate('/dashboard')}
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
                Back to Dashboard
            </button>
            {/* Main content with EntryList */}
            <div className={styles.content}>
            <EntryList 
                entries={[]} 
                onEntryClick={handleEntryClick} 
                onNewEntry={handleNewEntry}/>
            {/* EntryDetail (when not mobile) */}
            <EntryDetails />
            </div>
            
        </div>
    )
  }
  
  export default JournalPage