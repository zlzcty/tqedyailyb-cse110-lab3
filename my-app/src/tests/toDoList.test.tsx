import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoList } from '../toDoList';
import { dummyGroceryList } from '../constant'; // Import the dummyGroceryList from the appropriate module

// check that all the items are displayed on the page
describe('Read ToDoList', () => {
    test('dummy items are visible', () => {
        render(<ToDoList />);

        dummyGroceryList.forEach( (item) => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });
});

// check that the number of items checked matches what's displayed
describe('Items Checked', () => {
    test('correct number of items checked', () => {
        render(<ToDoList />);

        // by default zero items are selected
        expect(screen.getByText('Items bought: 0')).toBeInTheDocument();

        // check one item
        fireEvent.click(screen.getByTestId('ApplesBox'));
        expect(screen.getByText('Items bought: 1')).toBeInTheDocument();

        // check another item
        fireEvent.click(screen.getByTestId('BananasBox'));
        expect(screen.getByText('Items bought: 2')).toBeInTheDocument();

        // uncheck an item
        fireEvent.click(screen.getByTestId('ApplesBox'));
        expect(screen.getByText('Items bought: 1')).toBeInTheDocument();
    });
});
