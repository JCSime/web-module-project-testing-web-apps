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
    expect(header).toBeTruthy();
    expect(header).not.toBeNull();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    waitFor(async ()=> {
        render(<ContactForm/>);
        const firstName = screen.getByLabelText(/First Name*/i);
        userEvent.type(firstName, "bad");
        userEvent.click(screen);
        expect(firstName).toThrow();
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    waitFor(async ()=> {
        render(<ContactForm/>);
        const firstName = screen.getByLabelText(/First Name*/i);
        const lastName = screen.getByLabelText(/Last Name*/i);
        const email = screen.getByLabelText(/Email*/i);
        userEvent.type(firstName, "");
        userEvent.type(lastName, "");
        userEvent.type(email, "");
        userEvent.click(screen);
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
    waitFor(async ()=> {
        render(<ContactForm/>);
        const email = screen.getByLabelText(/Email*/i);
        userEvent.type(email, "");
        expect(screen.getByText(/email must be a valid email address/i)).toBeTruthy();
    });
});

test('renders "lastName is a required field" if a last name is not entered and the submit button is clicked', async () => {
    waitFor(async ()=> {
        render(<ContactForm/>);
        const lastName = screen.getByLabelText(/Last Name*/i);
        const submit = screen.getByRole("button");
        userEvent.type(lastName, "");
        userEvent.click(submit);
        expect(screen.getByText(/lastName is a required field/i)).toBeTruthy();
    });
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    waitFor(async ()=> {
        render(<ContactForm/>);
        const firstName = screen.getByLabelText(/First Name*/i);
        const lastName = screen.getByLabelText(/Last Name*/i);
        const email = screen.getByLabelText(/Email*/i);
        const submit = screen.getByRole("button");
        userEvent.type(firstName, "Thomas");
        userEvent.type(lastName, "Anderson");
        userEvent.type(email, "TAnderson@Cmail.com");
        userEvent.click(submit);
        expect(screen.getByText(/First Name:/)).toBeTruthy();
        expect(screen.getByText(/Last Name:/)).toBeTruthy();
        expect(screen.getByText(/Email:/)).toBeTruthy();
        expect(screen.getByText(/Message:/)).not.toBeTruthy();

    });
});

test('renders all fields text when all fields are submitted.', async () => {
    waitFor(async ()=> {
        render(<ContactForm/>);
        const firstName = screen.getByLabelText(/First Name*/i);
        const lastName = screen.getByLabelText(/Last Name*/i);
        const email = screen.getByLabelText(/Email*/i);
        const message = screen.getByLabelText(/Message/i);
        const submit = screen.getByRole("button");
        userEvent.type(firstName, "Thomas");
        userEvent.type(lastName, "Anderson");
        userEvent.type(email, "TAnderson@Cmail.com");
        userEvent.type(message, "What is the Matrix?");
        userEvent.click(submit);
        expect(screen.getByText(/First Name:/)).toBeTruthy();
        expect(screen.getByText(/Last Name:/)).toBeTruthy();
        expect(screen.getByText(/Email:/)).toBeTruthy();
        expect(screen.getByText(/Message:/)).toBeTruthy();
    });
});