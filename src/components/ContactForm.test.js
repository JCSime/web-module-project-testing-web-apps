import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    waitFor(async ()=> {
        render(<ContactForm/>);
        const firstName = screen.getByLabelText(/First Name*/i);
        const submit = screen.queryByRole("button");
        userEvent.type(firstName, "bad");
        userEvent.click(submit);
        expect(firstName).toThrow();
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    waitFor(async ()=> {
        render(<ContactForm/>);
        const firstName = screen.getByLabelText(/First Name*/i);
        const lastName = screen.getByLabelText(/Last Name*/i);
        const email = screen.getByLabelText(/Email*/i);
        const submit = screen.queryByRole("button");
        userEvent.type(firstName, lastName, email, null);
        userEvent.click(submit);
        expect(firstName, lastName, email).toThrow();
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    waitFor(async ()=> {
        render(<ContactForm/>);
        const firstName = screen.getByLabelText(/First Name*/i);
        const lastName = screen.getByLabelText(/Last Name*/i);
        const email = screen.getByLabelText(/Email*/i);
        userEvent.type(firstName, "Thomas");
        userEvent.type(lastName, "Anderson");
        expect(email).toThrow();
    });

    //Alternate solution:
        // render(<ContactForm/>);
        // const firstName = screen.getByLabelText(/First Name*/i);
        // const lastName = screen.getByLabelText(/Last Name*/i);
        // userEvent.type(firstName, "Thomas");
        // userEvent.type(lastName, "Anderson");
        // expect(screen.getByText(/Error:/i)).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
});