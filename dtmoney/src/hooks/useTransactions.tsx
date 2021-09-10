import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
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
  createTransaction: (transaction: TransactionForm) => Promise<void>
}

/** Hack para arrumar erro de TS
 * {} as TransactionsContextData é um jeito de arrumar o erro
 * isto força ao TS dizendo que {} é do formato TransactionsContextData
 */
const TransactionContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export function TransactionProvider({ children }: TransactiopnProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api
      .get('/transactions')
      .then((response) => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionForm: TransactionForm) {
    const response = await api.post('/transaction', {
      ...transactionForm,
      createdAt: new Date()
    })

    const { transaction } = response.data
    setTransactions([
      ...transactions,
      transaction
    ])
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)

  return context
}
