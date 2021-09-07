import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Transaction {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

// interface TransactionForm {
//   title: string
//   amount: number
//   type: string
//   category: string
// }

// type TransactionForm = Pick<Transaction, 'title' | 'amount' | 'type' | 'category' >

type TransactionForm = Omit<Transaction, 'id' | 'createdAt'>

interface TransactiopnProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionForm) => void
}

/** Hack para arrumar erro de TS
 * {} as TransactionsContextData é um jeito de arrumar o erro
 * isto força ao TS dizendo que {} é do formato TransactionsContextData
 */
export const TransactionContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export function TransactionProvider({ children }: TransactiopnProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api
      .get('/transactions')
      .then((response) => setTransactions(response.data.transactions))
  }, [])

  function createTransaction(transaction: TransactionForm) {
    api.post('/transaction', transaction)
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}
