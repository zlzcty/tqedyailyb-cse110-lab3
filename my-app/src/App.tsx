import './App.css';
import { Label, Note } from './types'; // Import the Label type from the appropriate module
import { dummyNotesList } from './constant'; // Import the dummyNotesList from the appropriate module
import FavoriteButton from './FavoriteButton';
// import FavoriteList from "./FavoriteList"
// import { FavoritesProvider } from "./FavoritesContext"
import { ClickCounter } from './hooksExercise';
import React, { useState } from 'react';
import { ToggleThemeButton, ThemeProvider } from './ThemeContext';

function App() {
    const [favorites, setFavorites] = useState<Note[]>([]);

    const toggleFavorite = (item: Note) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(item)) {
                return prevFavorites.filter((favorite) => favorite !== item);
            } else {
                return [...prevFavorites, item];
            }
        });
    };

    return (
        <ThemeProvider>
            <div className="app-container">
                <div>
                    <form className="note-form">
                        <div>
                            <input placeholder="Note Title"></input>
                        </div>

                        <div>
                            <textarea></textarea>
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
                </div>
                {/* <ClickCounter /> */}
            </div>
        </ThemeProvider>
    );
}

export default App;
