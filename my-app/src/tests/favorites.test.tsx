import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StickyNotes } from '../stickyNotes';
import { ThemeProvider } from '../ThemeContext';

const dummyNotesList = [
    {
        id: 1,
        title: 'First Note',
        content: 'This is the first note.',
        label: 'Personal',
    },
    {
        id: 2,
        title: 'Second Note',
        content: 'This is the second note.',
        label: 'Work',
    },
];

jest.mock('../constant', () => ({
    dummyNotesList,
}));

describe('StickyNotes', () => {
    test('clicking the heart button on a note adds its title to the favorites list', () => {
        render(
            <ThemeProvider>
                <StickyNotes />
            </ThemeProvider>
        );

        // Check that the first note is rendered
        const firstNoteTitle = screen.getByText('First Note');
        expect(firstNoteTitle).toBeInTheDocument();

        // Find the favorite button and click it
        const favoriteButton = screen.getAllByText('🤍')[0];
        fireEvent.click(favoriteButton);

        // Check if the title of the first note is added to the favorites list
        const favoritesList = screen.getByRole('heading', {
            name: /list of favorites/i,
        }).nextElementSibling;
        expect(favoritesList).toContainHTML('<li>First Note</li>');
    });

    test('clicking the heart button again removes the note from the favorites list', () => {
        render(
            <ThemeProvider>
                <StickyNotes />
            </ThemeProvider>
        );

        // Same as previous
        const favoriteButton = screen.getAllByText('🤍')[0];
        fireEvent.click(favoriteButton);

        const favoritesList = screen.getByRole('heading', {
            name: /list of favorites/i,
        }).nextElementSibling;
        expect(favoritesList).toContainHTML('<li>First Note</li>');

        // Click the favorite button again to remove it
        fireEvent.click(favoriteButton);
        expect(favoritesList).not.toContainHTML('<li>First Note</li>');
    });
});
