import { ThemeProvider } from '@/components/theme-provider'
import { useState } from 'react'
import { ModeToggle } from './components/mode-toggle'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen flex-col content-center items-center justify-center gap-2">
        <div>Hello World</div>
        <div>Count: {count}</div>
        <div className="flex gap-2">
          <Button onClick={() => setCount(count + 1)}>Click me</Button>
          <ModeToggle />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
