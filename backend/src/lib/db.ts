import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export type Product = {
  id: string
  name: string
  description?: string
  price: number
  category?: string
  available?: boolean
  rating?: number
}

export type OrderItem = { productId: string; qty: number; price: number }
export type Order = { id: string; createdAt: string; status: 'open'|'paid'|'cancelled'; items: OrderItem[] }
export type Config = {
  storeName: string
  currency: string
  whatsappNumber: string
  theme?: Record<string,string>
  logoUrl?: string
  businessHours?: Array<{day:string; open:string; close:string}>
  deliveryAreas?: string[]
  paymentMethods?: string[]
}

export type User = { id: string; name: string; email: string; passwordHash: string; role: 'Admin'|'Operacional'|'Financeiro' }

export type DB = {
  config: Config|null
  products: Product[]
  orders: Order[]
  users: User[]
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DATA_PATH = `${__dirname}/../../data/db.json`

function ensure() {
  const dir = `${__dirname}/../../data`
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  if (!existsSync(DATA_PATH)) {
    const seed: DB = {
      config: {
        storeName: "DiDoces • Loja Artesanal",
        currency: "BRL",
        whatsappNumber: "+5511987654321"
      },
      products: [
        { id: "p1", name: "Sacolé Premium Morango", description: "Fruta in natura", price: 7.5, category: "Doces", available: true, rating: 4.8 },
        { id: "p2", name: "Sacolé Brigadeiro", description: "Cremoso cacau 50%", price: 8.0, category: "Doces", available: true, rating: 4.7 }
      ],
      orders: [],
      users: [{
        id: "u1",
        name: "Admin",
        email: "admin@local",
        passwordHash: "$2a$10$2g7vVd6Q6xw4oD9bY9Q1mOvL4I3FwjM8cKxv1eYqv9Y0eL8bK0p4S", // bcrypt hash of "admin123"
        role: "Admin"
      }]
    }
    writeFileSync(DATA_PATH, JSON.stringify(seed, null, 2), { encoding: 'utf-8' })
  }
}

export function load(): DB {
  ensure()
  return JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
}

export function save(db: DB) {
  writeFileSync(DATA_PATH, JSON.stringify(db, null, 2))
}
