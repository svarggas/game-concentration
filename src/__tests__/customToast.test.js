import React from 'react'
import { render, screen } from '@testing-library/react'
import CustomToast from '../components/CustomToast'
import '@testing-library/jest-dom'

const CustomToastComponent = (show, title, description) => (
    <CustomToast
        show={show}
        title={title}
        description={description}
    />
)

describe('Custom Toast Component', () => {
  it('Should render the toast with the paremeters sended', async () => {
    const title = 'Toast title';
    const description = 'Toast description';

    render(CustomToastComponent(true, title, description));

    expect(await screen.findByText(title)).toBeInTheDocument();
    expect(await screen.findByText(description)).toBeInTheDocument();
  });
});