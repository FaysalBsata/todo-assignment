import React from 'react'
import renderer from 'react-test-renderer'
import AppBar from './AppBar'
describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<AppBar />).toJSON()
    expect(tree.children.length).toBe(3)
  })
})
