import React from 'react';
import WeatherComponent from '../components/WeatherComponent';
// import WeatherList from '../components/WeatherList';
import { render, RenderResult, waitForElement, getByTestId, fireEvent, cleanup, queryByTestId } from '@testing-library/react';

afterEach(cleanup);
let component: RenderResult;
beforeEach(() => {
    component = render(<WeatherComponent />);
});

describe('Test weather form', () => {
    it('Should render initial form', () => {
        // Render tab with form
        const btnlement = getByTestId(component.container, 'form-btn');        
        fireEvent.click(btnlement);
        
        // Test initial values
        const inputElement = getByTestId(component.container, 'weather-input');
        const searchBtnElement = getByTestId(component.container, 'search-btn');
        expect(searchBtnElement).toBeDefined();
        expect(inputElement).toBeDefined();
        expect(inputElement).toHaveValue('');
        expect(inputElement.getAttribute('placeholder')).toBe("Введіть місто");
        expect(inputElement.getAttribute('type')).toBe("text");
    });

    it('Should change input value', () => {
        // Render tab with form
        const btnlement = getByTestId(component.container, 'form-btn');        
        fireEvent.click(btnlement);

        // Test input change
        const inputElement = getByTestId(component.container, 'weather-input');
        fireEvent.change(inputElement, { target: { value: 'test' } });
        expect(inputElement).toHaveValue('test');
    });

});

describe('Test content render', () => {
    it('Search success render', async () => {
        // Render tab with form
        const btnlement = getByTestId(component.container, 'form-btn');        
        fireEvent.click(btnlement);

        // Test search success
        const searchBtnElement = getByTestId(component.container, 'search-btn');
        const inputElement = getByTestId(component.container, 'weather-input');
        fireEvent.change(inputElement, { target: { value: 'Kyiv' } });
        fireEvent.click(searchBtnElement);
        const titleElement = await waitForElement(() => getByTestId(component.container, 'city-title'));
        expect(queryByTestId(component.container, 'error-message')).toBeNull();
        const listElement = getByTestId(component.container, 'weather-list');
        expect(listElement).toBeDefined();
        expect(titleElement.textContent).toBe('Kyiv');
    });

    it('Search error render', async () => {
        // Render tab with form
        const btnlement = getByTestId(component.container, 'form-btn');        
        fireEvent.click(btnlement);

        // Test search error
        const searchBtnElement = getByTestId(component.container, 'search-btn');
        const inputElement = getByTestId(component.container, 'weather-input');
        fireEvent.change(inputElement, { target: { value: '123213' } });
        fireEvent.click(searchBtnElement);
        const errorElement = await waitForElement(() => getByTestId(component.container, 'error-message'));
        expect(errorElement).toBeDefined();
        expect(queryByTestId(component.container, 'city-title')).toBeNull();
        expect(queryByTestId(component.container, 'weather-list')).toBeNull();
    });
});