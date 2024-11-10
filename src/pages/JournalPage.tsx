import JournalHeader from "@/components/Journal/JournalHeader"
import { useNavigate, useLocation } from "react-router-dom"
import styles from "@/styles/modules/pages/JournalPage.module.css"
import EntryList from "@/components/Journal/EntryList"
import { JournalEntry, NewEntryData } from "@/components/Journal/journal"
import EntryDetails from "@/components/Journal/EntryDetails"
import { useState, useEffect } from "react"

const JournalPage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [targetedEntry, setTargetedEntry] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Checks if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleEntryClick = (entry: JournalEntry) => {
        if (isMobile) {
            // Navigate to the full entry details page on mobile
            navigate(`/journal/entry/${entry.id}`);
        }else {
            setTargetedEntry(entry.id);
        }
    };

    const handleNewEntry = (entry: NewEntryData) => {
        console.log('New entry created:', entry);
        // Handle the new entry
    };

    // Check if we're on the entry details route
    const isEntryDetailsRoute = location.pathname.includes('/entry/');

    // On mobile, only show the EntryList on the main journal page
    if (isMobile && isEntryDetailsRoute) {
        return (
            <div className={styles.container}>
                <JournalHeader />
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
                <EntryDetails entryId={targetedEntry} />
            </div>
        );
    }

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
            
            <div className={styles.content}>
                <div className={styles.entryListContainer}>
                    <EntryList 
                        entries={[]} 
                        onEntryClick={handleEntryClick} 
                        onNewEntry={handleNewEntry}
                    />
                </div>
                
                {/* Show EntryDetails only on desktop */}
                {!isMobile && (
                    <div className={styles.entryDetailsContainer}>
                        <EntryDetails entryId={targetedEntry} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default JournalPage