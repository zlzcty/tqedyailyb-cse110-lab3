import { Label, Note } from './types'; // Import the Label type from the appropriate module
import { dummyNotesList } from './constant'; // Import the dummyNotesList from the appropriate module
import FavoriteButton from './FavoriteButton';
import { ClickCounter } from './hooksExercise';
import React, { useState } from 'react';
import { ToggleThemeButton, ThemeProvider } from './ThemeContext';

export const StickyNotes = () => {
    const [favorites, setFavorites] = useState<Note[]>([]);

    const toggleFavorite = (item: Note, remove: boolean) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(item)) {
                return prevFavorites.filter((favorite) => favorite !== item);
            } else {
                // 'remove'=True will only remove the note if it exists in favorites
                if (!remove) {
                    return [...prevFavorites, item];
                } else {
                    return [...prevFavorites];
                }
            }
        });
    };

    // 4.3.1 Create

    const [notes, setNotes] = useState(dummyNotesList);
    const initialNote = {
        id: -1,
        title: '',
        content: '',
        label: Label.other,
    };
    const [createNote, setCreateNote] = useState(initialNote);
    const [inputTitle, setInputTitle] = useState(initialNote.title);
    const [inputContent, setInputContent] = useState(initialNote.content);
    const [inputLabel, setInputLabel] = useState("other");

    const createNoteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('title: ', createNote.title);
        console.log('content: ', createNote.content);
        createNote.id = notes.length + 1;
        setNotes([createNote, ...notes]);
        setCreateNote(initialNote);
        setInputTitle(initialNote.title);
        setInputContent(initialNote.content);
        setInputLabel("other");
    };

    const removeNote = (removedNote: Note) => {
        // We can just use the setNotes function! It should always be used
        // when updating I think
        setNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== removedNote.id)
        );
        toggleFavorite(removedNote, true);
    };

    return (
        <ThemeProvider>
            <div className="app-container">
                <div>
                    <form className="note-form" onSubmit={createNoteHandler}>
                        <div>
                            <input
                                placeholder="Note Title"
                                value={inputTitle}
                                onChange={(event) => {
                                    setCreateNote({
                                        ...createNote,
                                        title: event.target.value });
                                        setInputTitle(event.target.value);
                                    }
                                }
                                required
                            ></input>
                        </div>

                        <div>
                            <textarea
                                placeholder="Note Content"
                                value={inputContent}
                                onChange={(event) => {
                                    setCreateNote({
                                        ...createNote,
                                        content: event.target.value });
                                        setInputContent(event.target.value);
                                    }
                                }
                                required
                            ></textarea>
                        </div>

                        <div>
                            <select
                                value={inputLabel}
                                onChange={(event) => {
                                    setCreateNote({
                                        ...createNote,
                                        label: event.target.value as Label });
                                        setInputLabel(event.target.value);
                                    }
                                }
                                required
                            >
                                <option value={Label.personal}>Personal</option>
                                <option value={Label.study}>Study</option>
                                <option value={Label.work}>Work</option>
                                <option value={Label.other}>Other</option>
                            </select>
                        </div>

                        <div>
                            <button type="submit">Create Note</button>
                        </div>
                    </form>
                    <ToggleThemeButton />

                    {/* <FavoriteList /> */}
                    <h2>List of Favorites</h2>
                    <ul>
                        {favorites.map((favorite, index) => (
                            <li key={index}>{favorite.title}</li>
                        ))}
                    </ul>
                </div>
                {/* 
                <div className="notes-grid">
                    {dummyNotesList.map((note) => (
                        <div key={note.id} className="note-item">
                            <div className="notes-header">
                                <FavoriteButton
                                    toggleFavorite={toggleFavorite}
                                    note={note}
                                />
                                <button>x</button>
                            </div>
                            <h2> {note.title} </h2>
                            <p> {note.content} </p>
                            <p> {note.label} </p>
                        </div>
                    ))}
                </div> */}

                <div className="notes-grid">
                    {notes.map((note) => (
                        <div key={note.id} data-testid={'note' + note.id} className="note-item">
                            <div className="notes-header">
                                <FavoriteButton
                                    toggleFavorite={toggleFavorite}
                                    note={note}
                                />
                                <button data-testid={'note' + note.id + 'x'} onClick={() => removeNote(note)}>
                                    x
                                </button>
                            </div>
                            <h2
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                            >
                                {' '}
                                {note.title}{' '}
                            </h2>
                            <p
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                            >
                                {' '}
                                {note.content}{' '}
                            </p>
                            <p
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                            >
                                {' '}
                                {note.label}{' '}
                            </p>
                        </div>
                    ))}
                </div>

                {/* <ClickCounter /> */}
            </div>
        </ThemeProvider>
    );
};
