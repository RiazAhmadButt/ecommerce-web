// import Link from 'next/link'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// // This would typically come from a database or API
// const products = [
//   { id: 1, name: "Product 1", price: 19.99 },
//   { id: 2, name: "Product 2", price: 29.99 },
//   { id: 3, name: "Product 3", price: 39.99 },
// ]

// export default function ProductsPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Our Products</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <Card key={product.id}>
//             <CardHeader>
//               <CardTitle>{product.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
//             </CardContent>
//             <CardFooter>
//               <Link href={`/products/${product.id}`}>
//                 <Button>View Details</Button>
//               </Link>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import { HelpCircle, Camera, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const InfoTooltip = ({ content }: { content: string }) => (
  <Tooltip>
    <TooltipTrigger>
      <HelpCircle className="h-4 w-4 text-[#008296] ml-2" />
    </TooltipTrigger>
    <TooltipContent className="w-80 p-2">
      <p className="text-xs">{content}</p>
    </TooltipContent>
  </Tooltip>
)

const steps = [
  { name: 'Product Identity', number: 1 },
  { name: 'Description', number: 2 },
  { name: 'Product Details', number: 3 },
  { name: 'Offer', number: 4 },
  { name: 'Safety & Compliance', number: 5 },
]

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [attributes, setAttributes] = useState('all')

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ProductIdentity attributes={attributes} />
      case 2:
        return <Description attributes={attributes} />
      case 3:
        return <ProductDetails attributes={attributes} />
      case 4:
        return <Offer attributes={attributes} />
      case 5:
        return <SafetyAndCompliance attributes={attributes} />
      default:
        return null
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#f5f5f5]">
        <header className="bg-[#232f3e] text-white py-2 px-4">
          <div className="container mx-auto">
            <img src="/placeholder.svg" alt="Amazon Seller Central" className="h-8" />
          </div>
        </header>
        <nav className="bg-white border-b border-gray-300 py-4">
          <div className="container mx-auto px-4">
            <ul className="flex items-center space-x-8">
              {steps.map((step) => (
                <li key={step.number} className={`flex items-center ${currentStep === step.number ? '' : 'opacity-50'}`}>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${currentStep === step.number ? 'bg-[#008296] text-white' : 'bg-gray-300'} text-sm font-bold`}>
                    {step.number}
                  </span>
                  <span className={`ml-2 ${currentStep === step.number ? 'font-medium text-[#008296]' : ''}`}>{step.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1">
              <Card className="p-4 border border-gray-300 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Attributes</h2>
                  <InfoTooltip content="Choose which attributes to display for your product." />
                </div>
                <RadioGroup value={attributes} onValueChange={setAttributes}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="required" id="required" />
                    <Label htmlFor="required" className={attributes === 'required' ? 'text-[#008296] font-semibold' : ''}>Required</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="recommended" id="recommended" />
                    <Label htmlFor="recommended" className={attributes === 'recommended' ? 'text-[#008296] font-semibold' : ''}>Recommended</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className={attributes === 'all' ? 'text-[#008296] font-semibold' : ''}>All attributes</Label>
                  </div>
                </RadioGroup>
              </Card>
            </div>

            <div className="col-span-3">
              <Card className="p-6 border border-gray-300 shadow-sm">
                {renderStepContent()}
              </Card>

              <div className="flex justify-between mt-6">
                <Button 
                  variant="secondary" 
                  className="bg-[#e7e9ec] text-black border border-[#8d9096] hover:bg-[#d8dadc]"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                <div className="space-x-2">
                  <Button variant="secondary" className="bg-[#e7e9ec] text-black border border-[#8d9096] hover:bg-[#d8dadc]">
                    Save as draft
                  </Button>
                  <Button 
                    className="bg-[#f0c14b] text-black border border-[#a88734] hover:bg-[#f4d078]"
                    onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  >
                    {currentStep === 5 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}

function ProductIdentity({ attributes }: { attributes: string }) {
  const [hasVariations, setHasVariations] = useState(false)
  const [variationTypes, setVariationTypes] = useState({ color: false, size: false })
  const [hasNoProductId, setHasNoProductId] = useState(false)

  const isFieldVisible = (isRequired: boolean, isRecommended: boolean) => {
    if (attributes === 'all') return true
    if (attributes === 'required' && isRequired) return true
    if (attributes === 'recommended' && (isRequired || isRecommended)) return true
    return false
  }

  return (
    <div className="space-y-6">
      {isFieldVisible(true, false) && (
        <div>
          <Label className="flex items-center mb-2 text-sm font-medium">
            Item Name
            <span className="text-red-500 ml-1">*</span>
            <InfoTooltip content="Enter a descriptive name for your product. Include key details like brand, model, color, and size." />
          </Label>
          <Textarea 
            className="w-full min-h-[100px]" 
            defaultValue="Snapsole Women's Pink Chunky Platform Flat Sandal - Size 6-11 (Euro) - Premium Quality, Casual, Slip On, Foam Insole, Rubber Sole, Synthetic Rubber Outer Material, Round Toe, Toe Strap"
          />
        </div>
      )}

      {isFieldVisible(true, false) && (
        <div>
          <Label className="flex items-center mb-2 text-sm font-medium">
            Recommended Browse Nodes
            <span className="text-red-500 ml-1">*</span>
            <InfoTooltip content="Select the most appropriate category for your product to ensure it appears in relevant search results." />
          </Label>
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="sandals">Sandals</SelectItem>
                <SelectItem value="womens">Women's Fashion</SelectItem>
              </SelectContent>
            </Select>
            <Lock className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}

      {isFieldVisible(false, true) && (
        <div>
          <Label className="flex items-center mb-2 text-sm font-medium">
            Variations
            <InfoTooltip content="Indicate if your product has multiple variations such as different colors or sizes." />
          </Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="variations" 
                checked={hasVariations}
                onCheckedChange={(checked) => setHasVariations(checked as boolean)}
              />
              <label htmlFor="variations" className="text-sm">This product has variations</label>
            </div>
            {hasVariations && (
              <div className="ml-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="color-variation" 
                    checked={variationTypes.color}
                    onCheckedChange={(checked) => setVariationTypes(prev => ({ ...prev, color: checked as boolean }))}
                  />
                  <label htmlFor="color-variation" className="text-sm">Color variation</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="size-variation" 
                    checked={variationTypes.size}
                    onCheckedChange={(checked) => setVariationTypes(prev => ({ ...prev, size: checked as boolean }))}
                  />
                  <label htmlFor="size-variation" className="text-sm">Size variation</label>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isFieldVisible(true, false) && (
        <div>
          <Label className="flex items-center mb-2 text-sm font-medium">
            Brand Name
            <span className="text-red-500 ml-1">*</span>
            <InfoTooltip content="Enter the brand name of your product. If it's a generic product without a brand, check the box below." />
          </Label>
          <Input defaultValue="Snapsole" className="max-w-md" />
          <div className="mt-2 flex items-center space-x-2">
            <Checkbox id="no-brand" />
            <label htmlFor="no-brand" className="text-sm">This product does not have a brand name</label>
          </div>
        </div>
      )}

      {isFieldVisible(false, true) && (
        <div>
          <Label className="flex items-center mb-2 text-sm font-medium">
            External Product ID
            <InfoTooltip content="Enter a unique identifier for your product, such as UPC, EAN, or ISBN. If you don't have one, check the box below." />
          </Label>
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Example: 714532191586" 
              className="max-w-md" 
              disabled={hasNoProductId}
            />
            <Select defaultValue="upc" disabled={hasNoProductId}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Example: UPC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upc">UPC</SelectItem>
                <SelectItem value="ean">EAN</SelectItem>
                <SelectItem value="isbn">ISBN</SelectItem>
              </SelectContent>
            </Select>
            <Lock className="h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <Checkbox 
              id="no-product-id" 
              checked={hasNoProductId}
              onCheckedChange={(checked) => setHasNoProductId(checked as boolean)}
            />
            <label htmlFor="no-product-id" className="text-sm">I don't have a Product ID</label>
          </div>
        </div>
      )}
    </div>
  )
}

function Description({ attributes }: { attributes: string }) {
  const [bulletPoints, setBulletPoints] = useState([
    "Color: Choose a vibrant shade of pink that adds a pop of color to any outfit.",
    "Size Range: Available in sizes 36 to 41, providing a wide range of options for a comfortable fit.",
    "Material: Constructed with a combination of synthetic rubber, TPU, and polyester for durability and flexibility.",
    "Design: Features a flat sandal style with a chunky design, perfect for casual walking and a trendy look."
  ])

  const isFieldVisible = (isRequired: boolean, isRecommended: boolean) => {
    if (attributes === 'all') return true
    if (attributes === 'required' && isRequired) return true
    if (attributes === 'recommended' && (isRequired || isRecommended)) return true
    return false
  }

  return (
    <div className="space-y-6">
      {isFieldVisible(true, false) && (
        <div>
          <Label className="flex items-center mb-2 text-sm font-medium">
            Product Description
            <span className="text-red-500 ml-1">*</span>
            <InfoTooltip content="Provide a detailed description of your product including its features and benefits." />
          </Label>
          <Textarea 
            className="min-h-[150px] bg-[#ffffd7]"
            defaultValue="Discover the Snapsole Women's Premium Pink Chunky Sneaker, a must-have for your casual wardrobe. This flat sandal is designed with a platform style and features a round toe and toe strap, ensuring a comfortable and secure fit. The outer material is made of high-quality synthetic rubber, TPU, and polyester, providing durability and style. The insole is made of foam or EVA, offering cushioning for all-day wear. The sandal is available in sizes 36 to 41 in Euro size system, making it suitable for a wide range of foot sizes. The recommended uses for this product are walking, making it an ideal choice for everyday wear. The product is manufactured by Snapsole and is recommended for women who seek the perfect blend of style, comfort, and quality with the Snapsole Women's Premium Pink Chunky Sneaker."
          />
        </div>
      )}

      {isFieldVisible(true, false) && (
        <div>
          <Label className="flex items-center mb-2 text-sm font-medium">
            Bullet Points
            <span className="text-red-500 ml-1">*</span>
            <InfoTooltip content="Add key product features as bullet points." />
          </Label>
          <div className="space-y-4">
            {bulletPoints.map((point, index) => (
              <Textarea 
                key={index}
                className="bg-[#ffffd7]"
                value={point}
                onChange={(e) => {
                  const newPoints = [...bulletPoints]
                  newPoints[index] = e.target.value
                  setBulletPoints(newPoints)
                }}
              />
            ))}
            <div className="flex items-center gap-4">
              <Button 
                variant="link" 
                onClick={() => setBulletPoints([...bulletPoints, ''])}
                className="text-[#008296] hover:text-[#008296]/80"
              >
                Add More
              </Button>
              {bulletPoints.length > 1 && (
                <Button 
                  variant="link" 
                  onClick={() => setBulletPoints(bulletPoints.slice(0, -1))}
                  className="text-[#008296] hover:text-[#008296]/80"
                >
                  Remove Last
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {isFieldVisible(true, false) && (
        <div>
          <Label className="flex items-center mb-2 text-sm font-medium">
            Images
            <InfoTooltip content="Upload product images. The first image will be the main product image." />
          </Label>
          <p className="text-sm text-muted-foreground mb-4">Upload multiple files or drag and drop 1 or more files below.</p>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Upload</span>
                {index === 0 && (
                  <span className="text-xs text-muted-foreground mt-1">MAIN</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ProductDetails({ attributes }: { attributes: string }) {
  const [specialFeatures, setSpecialFeatures] = useState(['Premium Quality, Chunky Design'])
  const [recommendedUses, setRecommendedUses] = useState(['Walking'])

  const isFieldVisible = (isRequired: boolean, isRecommended: boolean) => {
    if (attributes === 'all') return true
    if (attributes === 'required' && isRequired) return true
    if (attributes === 'recommended' && (isRequired || isRecommended)) return true
    return false
  }

  return (
    <div className="space-y-6">
      {isFieldVisible(true, false) && (
        <>
          <div>
            <Label className="flex items-center mb-2 text-sm font-medium">
              Model Number
              <span className="text-red-500 ml-1">*</span>
              <InfoTooltip content="Enter the unique identifier for this specific product model." />
            </Label>
            <Input placeholder="Example: RXZER23" className="max-w-md" />
          </div>

          <div>
            <Label className="flex items-center mb-2 text-sm font-medium">
              Model Name
              <span className="text-red-500 ml-1">*</span>
              <InfoTooltip content="Enter the name of your product model." />
            </Label>
            <Input placeholder="Example: Lunar Tempo" className="max-w-md" />
          </div>
        </>
      )}

      {isFieldVisible(false, true) && (
        <>
          <div>
            <Label className="flex items-center mb-2 text-sm font-medium">
              Manufacturer
              <InfoTooltip content="Enter the name of the manufacturer of your product." />
            </Label>
            <Input defaultValue="Snapsole" className="max-w-md bg-[#ffffd7]" />
          </div>

          <div>
            <Label className="flex items-center mb-2 text-sm font-medium">
              Generic Keywords
              <InfoTooltip content="Enter relevant keywords that describe your product. Separate each keyword with a semicolon (;)." />
            </Label>
            <Input placeholder="Example: Running shoes; Workout shoes; Exercise; Road running; Men's shoes" className="max-w-md" />
          </div>

          <div>
            <Label className="flex items-center mb-2 text-sm font-medium">
              Special Features
              <InfoTooltip content="List any unique or noteworthy features of your product." />
            </Label>
            {specialFeatures.map((feature, index) => (
              <Input
                key={index}
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...specialFeatures]
                  newFeatures[index] = e.target.value
                  setSpecialFeatures(newFeatures)
                }}
                className="max-w-md mb-2 bg-[#ffffd7]"
              />
            ))}
            <Button
              variant="link"
              onClick={() => setSpecialFeatures([...specialFeatures, ''])}
              className="text-[#008296] hover:text-[#008296]/80 px-0"
            >
              Add More
            </Button>
          </div>
        </>
      )}

      {isFieldVisible(true, false) && (
        <div>
          <Label className="flex items-center mb-2 text-sm font-medium">
            Target Gender
            <span className="text-red-500 ml-1">*</span>
            <InfoTooltip content="Specify the intended gender for your product." />
          </Label>
          <Select defaultValue="female">
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Select target gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="unisex">Unisex</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Color, Footwear Size, Material Details, and Design Features sections would go here */}
      {/* They would follow a similar pattern to the sections above */}

      {isFieldVisible(false, true) && (
        <div>
          <Label className="flex items-center mb-2 text-sm font-medium">
            Recommended Uses For Product
            <InfoTooltip content="List the recommended uses or activities for this product." />
          </Label>
          {recommendedUses.map((use, index) => (
            <Input
              key={index}
              value={use}
              onChange={(e) => {
                const newUses = [...recommendedUses]
                newUses[index] = e.target.value
                setRecommendedUses(newUses)
              }}
              className="max-w-md mb-2 bg-[#ffffd7]"
            />
          ))}
          <Button
            variant="link"
            onClick={() => setRecommendedUses([...recommendedUses, ''])}
            className="text-[#008296] hover:text-[#008296]/80 px-0"
          >
            Add More
          </Button>
        </div>
      )}
    </div>
  )
}

function Offer({ attributes }: { attributes: string }) {
  const [fulfillmentType, setFulfillmentType] = useState<'merchant' | 'amazon' | null>(null)

  const isFieldVisible = (isRequired: boolean, isRecommended: boolean) => {
    if (attributes === 'all') return true
    if (attributes === 'required' && isRequired) return true
    if (attributes === 'recommended' && (isRequired || isRecommended)) return true
    return false
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="flex items-center mb-2 text-sm font-medium">
          Seller SKU
          <InfoTooltip content="Enter a unique identifier for this product in your inventory." />
        </Label>
        <Input defaultValue="IG-W4CD-ZKPZ" className="max-w-md bg-[#ffffd7]" />
      </div>

      <div>
        <Label className="flex items-center mb-2 text-sm font-medium">
          Quantity
          <span className="text-red-500 ml-1">*</span>
          <InfoTooltip content="Enter the number of units available for sale." />
        </Label>
        <Input defaultValue="152" type="number" className="max-w-md" />
      </div>

      <div>
        <Label className="flex items-center mb-2 text-sm font-medium">
          Your Price
          <span className="text-red-500 ml-1">*</span>
          <InfoTooltip content="Enter your selling price for this item." />
        </Label>
        <div className="flex items-center gap-2 max-w-md">
          <Select defaultValue="AED">
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AED">AED</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Ex: 50.00" />
        </div>
      </div>

      <div>
        <Label className="flex items-center mb-2 text-sm font-medium">
          Offering Condition Type
          <span className="text-red-500 ml-1">*</span>
          <InfoTooltip content="Select the condition of the item you're selling." />
        </Label>
        <Select defaultValue="new">
          <SelectTrigger className="max-w-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="used">Used</SelectItem>
            <SelectItem value="refurbished">Refurbished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="flex items-center mb-2 text-sm font-medium">
          <span className="text-red-500 mr-1">*</span>
          Fulfillment Channel
          <InfoTooltip content="Select how you want to fulfill orders for this item." />
        </Label>
        {/* <RadioGroup value={fulfillmentType} onValueChange={(value) => setFulfillmentType(value as 'merchant' | 'amazon')}>
          <div className="space-y-4">
            <div className="flex items-start space-x-2 border rounded-md p-4">
              <RadioGroupItem value="merchant" id="merchant-fulfilled" className="mt-1" />
              <div>
                <Label htmlFor="merchant-fulfilled" className="font-medium">I will ship this item myself (Self Ship) or I will pack this item and Amazon will pick up & ship (Easy Ship)</Label>
                <p className="text-sm text-gray-500">(Merchant Fulfilled)</p>
              </div>
            </div>
            <div className="flex items-start space-x-2 border rounded-md p-4">
              <RadioGroupItem value="amazon" id="amazon-fulfilled" className="mt-1" />
              <div>
                <Label htmlFor="amazon-fulfilled" className="font-medium">Amazon will ship and provide customer service</Label>
                <p className="text-sm text-gray-500">(Fulfilled by Amazon)</p>
              </div>
            </div>
          </div>
        </RadioGroup> */}
      </div>

      {fulfillmentType === 'merchant' && (
        <div>
          <Label className="flex items-center mb-2 text-sm font-medium">
            Merchant Shipping Group
            <span className="text-red-500 ml-1">*</span>
            <InfoTooltip content="Select the shipping template to use for this product." />
          </Label>
          <Select defaultValue="initial">
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="Initial Shipping Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="initial">Initial Shipping Template</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {fulfillmentType === 'amazon' && (
        <div className="bg-[#f1faff] border border-[#b4d4e4] p-4 rounded-md">
          <p className="text-sm">You are not registered for Fulfilled by Amazon. <a href="#" className="text-[#008296] hover:underline">Register now</a></p>
          <p className="text-sm mt-2">For now, you can choose "Merchant Fulfilled" option, and change it to "Fulfilled by Amazon" later once you are registered.</p>
        </div>
      )}
    </div>
  )
}

function SafetyAndCompliance({ attributes }: { attributes: string }) {
  const isFieldVisible = (isRequired: boolean, isRecommended: boolean) => {
    if (attributes === 'all') return true
    if (attributes === 'required' && isRequired) return true
    if (attributes === 'recommended' && (isRequired || isRecommended)) return true
    return false
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="flex items-center mb-2 text-sm font-medium">
          <span className="text-red-500 mr-1">*</span>
          Country/Region of Origin
          <InfoTooltip content="Select the country or region where the product was manufactured or produced." />
        </Label>
        <Select>
          <SelectTrigger className="max-w-md">
            <SelectValue placeholder="Example: China" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="china">China</SelectItem>
            <SelectItem value="usa">United States</SelectItem>
            <SelectItem value="india">India</SelectItem>
            <SelectItem value="vietnam">Vietnam</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="flex items-center mb-2 text-sm font-medium">
          <span className="text-red-500 mr-1">*</span>
          Are batteries required?
          <InfoTooltip content="Indicate whether this product requires batteries to function." />
        </Label>
        <RadioGroup defaultValue="no">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="batteries-yes" />
            <Label htmlFor="batteries-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="batteries-no" />
            <Label htmlFor="batteries-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="flex items-center mb-2 text-sm font-medium">
          <span className="text-red-500 mr-1">*</span>
          Dangerous Goods Regulations
          <InfoTooltip content="Select any applicable dangerous goods regulations for this product." />
        </Label>
        <Select>
          <SelectTrigger className="max-w-md">
            <SelectValue placeholder="Example: GHS, Storage, Transportation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="ghs">GHS (Globally Harmonized System)</SelectItem>
            <SelectItem value="storage">Storage Requirements</SelectItem>
            <SelectItem value="transport">Transportation Requirements</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="link" className="mt-2 h-auto p-0 text-[#008296] text-sm">Add More</Button>
      </div>

      <div>
        <Label className="flex items-center mb-2 text-sm font-medium">
          <span className="text-red-500 mr-1">*</span>
          Outer Material
          <InfoTooltip content="Enter the primary material used for the outer surface of the product." />
        </Label>
        <Input defaultValue="Synthetic Rubber, TPU, Polyester" className="max-w-md bg-[#ffffd7]" />
        <Button variant="link" className="mt-2 h-auto p-0 text-[#008296] text-sm">Add More</Button>
      </div>
    </div>
  )
}
