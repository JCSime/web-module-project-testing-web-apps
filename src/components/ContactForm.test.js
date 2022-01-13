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
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "bad");
    const error = await screen.findAllByTestId('error');
    expect(error).toHaveLength(1);

    // Alternate Solution:

    // waitFor(async ()=> {
    //     render(<ContactForm/>);
    //     const firstName = screen.getByLabelText(/First Name*/i);
    //     userEvent.type(firstName, "bad");
    //     userEvent.click(screen);
    //     expect(firstName).toThrow();
    // });
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const submit = screen.getByRole("button");
    userEvent.click(submit);
    await waitFor(()=> {
        const error = screen.queryAllByTestId("error");
        expect(error).toHaveLength(3);
    });

    
    // waitFor(async ()=> {
    //     render(<ContactForm/>);
    //     const firstName = screen.getByLabelText(/First Name*/i);
    //     const lastName = screen.getByLabelText(/Last Name*/i);
    //     const email = screen.getByLabelText(/Email*/i);
    //     userEvent.type(firstName, "");
    //     userEvent.type(lastName, "");
    //     userEvent.type(email, "");
    //     userEvent.click(screen);
    //     expect(firstName, lastName, email).toThrow();
    // })

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First Name*/i);
    const lastName = screen.getByLabelText(/Last Name*/i);
    const submit = screen.getByRole("button");
    userEvent.type(firstName, "Thomas");
    userEvent.type(lastName, "Anderson");
    userEvent.click(submit);
    const error = await screen.getAllByTestId("error");
    expect(error);

    //Alternate solution:
        // render(<ContactForm/>);
        // const firstName = screen.getByLabelText(/First Name*/i);
        // const lastName = screen.getByLabelText(/Last Name*/i);
        // userEvent.type(firstName, "Thomas");
        // userEvent.type(lastName, "Anderson");
        // const submit = screen.getByRole("button");
        // userEvent.type(submit);
        // expect(screen.getByText(/Error:/i)).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, "notreal");
    const error = await screen.findByText(/email must be a valid email address/i);
    expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if a last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const submit = screen.getByRole("button");
    userEvent.click(submit);
    const error = await screen.findByText(/lastName is a required field/i);
    expect(error).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First Name*/i);
    const lastName = screen.getByLabelText(/Last Name*/i);
    const email = screen.getByLabelText(/Email*/i);
    const submit = screen.getByRole("button");
    userEvent.type(firstName, "Thomas");
    userEvent.type(lastName, "Anderson");
    userEvent.type(email, "TAnderson@Cmail.com");
    userEvent.click(submit);

    await waitFor(()=> {
        const firstnameDis = screen.queryByText("Thomas");
        const lastnameDis = screen.queryByText("Anderson");
        const emailDis = screen.queryByText("TAnderson@Cmail.com");
        const messageDis = screen.queryByTestId("messageDis");
        expect(firstnameDis).toBeInTheDocument();
        expect(lastnameDis).toBeInTheDocument();
        expect(emailDis).toBeInTheDocument();
        expect(messageDis).not.toBeInTheDocument();
    })

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First Name*/i);
    const lastName = screen.getByLabelText(/Last Name*/i);
    const email = screen.getByLabelText(/Email*/i);
    const submit = screen.getByRole("button");
    const message = screen.getByLabelText(/Message/i);
    userEvent.type(firstName, "Thomas");
    userEvent.type(lastName, "Anderson");
    userEvent.type(email, "TAnderson@Cmail.com");
    userEvent.type(message, "What is the Matrix?");
    userEvent.click(submit);

    await waitFor(()=> {
        const firstnameDis = screen.queryByText("Thomas");
        const lastnameDis = screen.queryByText("Anderson");
        const emailDis = screen.queryByText("TAnderson@Cmail.com");
        const messageDis = screen.queryByText("What is the Matrix?");
        expect(firstnameDis).toBeInTheDocument();
        expect(lastnameDis).toBeInTheDocument();
        expect(emailDis).toBeInTheDocument();
        expect(messageDis).toBeInTheDocument();
    });
});