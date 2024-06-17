import React from 'react'
import figma from '../..'
import { Button } from './components/TestComponents'

figma.connect(Button, 'ui/button', {
  example: () => <Button>Click me</Button>,
})
