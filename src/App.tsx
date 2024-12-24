import { ThemeProvider } from '@/components/theme-provider'
import { useState } from 'react'
import { ModeToggle } from './components/mode-toggle'
import { InputForm } from './components/sample-form'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mx-auto mt-2 w-10/12 rounded border p-4">
        <InputForm />
      </div>

      <div className="hidden h-screen flex-col content-center items-center justify-center gap-2">
        <div>Hello World</div>
        <div>Count: {count}</div>
        <div className="flex gap-2">
          <Button onClick={() => setCount(count + 1)}>Click me</Button>
          <ModeToggle />
        </div>
        <InputForm />
      </div>
    </ThemeProvider>
  )
}

export default App
