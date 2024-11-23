import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"

// This would typically come from a database or API
const products = [
  { id: 1, name: "Product 1", price: 19.99, description: "This is product 1" },
  { id: 2, name: "Product 2", price: 29.99, description: "This is product 2" },
  { id: 3, name: "Product 3", price: 39.99, description: "This is product 3" },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
      <p className="mb-8">{product.description}</p>
      <Button>Add to Cart</Button>
    </div>
  )
}

