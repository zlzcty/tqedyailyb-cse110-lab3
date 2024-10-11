import React, { useState, useEffect } from 'react';
import { Note } from './types';

type FavoriteButtonProps = {
    note: Note; // the note object the FavoriteButton is a part of
    toggleFavorite: (item: Note) => void;
};

let instanceCounter = 0;

export default function FavoriteButton({
    toggleFavorite,
    note,
}: FavoriteButtonProps) {
    const [toggled, setToggled] = useState(false);

    const instanceId = `checkbox-${instanceCounter++}`;

    // this triggers whenever our state changes
    useEffect(() => {
        console.log(`Favorite is clicked`);
    }, [toggled]);

    // we specified for this to activate whenever it is changed
    const toggleClick = () => {
        setToggled((prevState) => !prevState);
        toggleFavorite(note);
    };

    return (
        <div>
            <input
                type="checkbox"
                id={`checkbox-${instanceId}`}
                checked={toggled}
                onChange={toggleClick}
                style={{ display: 'none' }}
            />

            <label htmlFor={`checkbox-${instanceId}`}>
                {toggled ? '❤️' : '🤍'}
            </label>
        </div>
    );
}
