
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2 text-green-600">
      <h3 >Welcome Home!!!</h3>
    </div>
  )
}
