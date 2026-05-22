// this is for the flashcards that are sent back from the backend as a response
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  createdAt: string;
  userId: string;
}

// this is for the forms
export interface CreateFlashcardInput {
  front: string;
  back: string;
}

// this is also for the forms, but specifically for the main page. passes a prop
export interface FlashcardFormProps {
  onCardCreated: (newCard: any) => void;
}

// another prop for the flashcards list
export interface FlashcardCardProps {
  card: Flashcard;
}
