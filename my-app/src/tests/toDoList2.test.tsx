import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoList } from '../toDoList';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('../constant', () => ({
    dummyGroceryList: [
        { name: 'Apples', isPurchased: false },
        { name: 'Bananas', isPurchased: false },
        { name: 'Oranges', isPurchased: false },
    ],
}));

describe('ToDoList', () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/todolist/John']}>
                <Routes>
                    <Route path="/todolist/:name" element={<ToDoList />} />
                </Routes>
            </MemoryRouter>
        );
    });

    test('Name route is successfully passed and rendered', () => {
        expect(screen.getByText(/John's To Do List/i)).toBeInTheDocument();
    });

    test('Checkbox functionality updates remaining items', () => {
        const checkbox = screen.getByTestId('ApplesBox') as HTMLInputElement;

        expect(screen.getByText(/Items bought: 0/i)).toBeInTheDocument();

        fireEvent.click(checkbox);

        expect(screen.getByText(/Items bought: 1/i)).toBeInTheDocument();
    });

    test('Initial number of remaining items is correct', () => {
        expect(screen.getByText(/Items bought: 0/i)).toBeInTheDocument();
    });
});
