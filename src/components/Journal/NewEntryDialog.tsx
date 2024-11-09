import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { NewEntryData } from "@/components/Journal/journal"
import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "@firebase/firestore"
import { db, auth } from "@/config/firebase"
import { useAuth } from "@/context/AuthContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import styles from "@/styles/modules/Journal/NewEntryDialog.module.css"

interface NewEntryDialogProps {
  onNewEntry: (entry: NewEntryData) => void;
}

const NewEntryDialog: React.FC<NewEntryDialogProps> = ({ onNewEntry }) => {
    const { user } = useAuth()
    // 1. Create state for form data:
        const [newEntry, setNewEntry] = useState<NewEntryData>({ title: "", content: "", mood: "neutral" })
    
    // 2. Create form submit handler:
            const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                
                if (!user) {
                    console.error('No user logged in');
                    return;
                }

                try {
                    // Save to Firebase
                    const docRef = await addDoc(collection(db, "journal-entries"), {
                        ...newEntry,
                        userId: auth.currentUser?.uid,
                        createdAt: serverTimestamp()
                    });

                    // Call onNewEntry with the new entry data including the ID
                    onNewEntry({ ...newEntry, id: docRef.id });

                    // Clear form and close dialog
                    setNewEntry({ title: '', content: '', mood: 'neutral' });
                    

                } catch (error) {
                    console.error('Error adding entry: ', error);
                }
    }


  
  return (
    <>
    <div>
        <Dialog>
            <DialogTrigger asChild className={styles.trigger}>
                <Button>
                    <Plus />
                    New Entry
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <DialogHeader>
                        <DialogTitle className={styles.Dialogtitle}>
                            New Entry
                        </DialogTitle>
                    </DialogHeader>
                    <div className={styles.inputContainer}>
                        <label htmlFor="title">Title</label>
                        <Input 
                            id="title"
                            type="text"
                            value={newEntry.title}
                            onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="mood">Mood</label>
                        <Select
                            value={newEntry.mood}
                            onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a mood"  />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="happy">Happy</SelectItem>
                                <SelectItem value="sad">Sad</SelectItem>
                                <SelectItem value="neutral">Neutral</SelectItem>
                                <SelectItem value="excited">Excited</SelectItem>
                                <SelectItem value="anxious">Anxious</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="content">Content</label>
                        <Textarea 
                            id="content"
                            value={newEntry.content}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewEntry({ ...newEntry, content: e.target.value })}
                        />
                    </div>
                    <Button type="submit" className={styles.submitButton}>Create</Button>
                </form>
            </DialogContent>
        </Dialog>
    </div>
    
    
    </>
  )
}

export default NewEntryDialog
