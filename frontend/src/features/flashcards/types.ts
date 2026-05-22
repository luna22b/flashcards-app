export interface Flashcard {
  id: string;
  front: string;
  back: string;
  createdAt: string;
  userId: string;
}

export interface CreateFlashcardInput {
  front: string;
  back: string;
}
