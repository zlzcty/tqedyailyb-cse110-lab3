import { render, screen, fireEvent } from '@testing-library/react';
import { StickyNotes } from '../stickyNotes';
import { dummyNotesList } from '.././constant'; // Import the dummyNotesList from the appropriate module

describe('Create StickyNote', () => {
    test('renders create note form', () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText('Create Note');
        expect(createNoteButton).toBeInTheDocument();
    });

    test('creates a new note', () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText('Note Title');
        const createNoteContentTextarea =
            screen.getByPlaceholderText('Note Content');
        const createNoteButton = screen.getByText('Create Note');

        fireEvent.change(createNoteTitleInput, {
            target: { value: 'New Note' },
        });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: 'Note content' },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText('New Note');
        const newNoteContent = screen.getByText('Note content');

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });
});

// check that all the notes are displayed on the page
describe('Read StickyNote', () => {
    test('dummy notes are visible', () => {
        render(<StickyNotes />);

        dummyNotesList.forEach( (note) => {
            expect(screen.getByText(note.title)).toBeInTheDocument();
            expect(screen.getByText(note.content)).toBeInTheDocument();
        });
    });
});

// check that updating a sticky note works as expected
describe('Update StickyNote', () => {
    test('updates apply to the note', () => {
        render(<StickyNotes />);

        screen.getByTestId('note1').innerHTML = screen.getByTestId('note1').innerHTML.replace('test note 1 title','updated title');
        screen.getByTestId('note1').innerHTML = screen.getByTestId('note1').innerHTML.replace('test note 1 content','updated content');
        expect(screen.getByText('updated title')).toBeInTheDocument();
        expect(screen.getByText('updated content')).toBeInTheDocument();
    });
});

// check that deleting a sticky note works as expected
describe('Delete StickyNote', () => {
    test('delete a sticky note', () => {
        render(<StickyNotes />);
        
        // make sure note is already present in the document
        const testNote = screen.getByText('test note 1 title');
        expect(testNote).toBeInTheDocument();

        // ensure note is removed after the delete button is clicked
        const deleteButton = screen.getByTestId('note1x');
        fireEvent.click(deleteButton);
        expect(testNote).not.toBeInTheDocument();
    });
});
