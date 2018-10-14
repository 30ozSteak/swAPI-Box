import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'
import fetchData from './Fetch/Fetch'

describe('App', () => {
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('should match the screenshot', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })

it('should have a default state', async () => {
    const wrapper = shallow(<App />)
    const expected = { films: [], homeState: 'active-main home-main', people: [], vehicles: [], planets: [], species: [] }
    expect(wrapper.state()).toEqual(expected)
  })

 it('should retreive data from API for scrolling film information', async () => {

  let expected = [{ name: 'Luke Skywalker', homeworld: 'Tatooine' }]

  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true, json: () => Promise.resolve(expected)}))

  const URL = 'https://swapi.co/api/people';
  const result = await fetchData(URL)
  const filmData = result
  expect(filmData).toEqual(expected) 
 })


})  