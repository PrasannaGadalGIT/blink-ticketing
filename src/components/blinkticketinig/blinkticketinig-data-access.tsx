'use client'

import {getBlinkticketinigProgram, getBlinkticketinigProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'

export function useBlinkticketinigProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getBlinkticketinigProgramId(cluster.network as Cluster), [cluster])
  const program = getBlinkticketinigProgram(provider)

  const accounts = useQuery({
    queryKey: ['blinkticketinig', 'all', { cluster }],
    queryFn: () => program.account.blinkticketinig.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['blinkticketinig', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ blinkticketinig: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useBlinkticketinigProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useBlinkticketinigProgram()

  const accountQuery = useQuery({
    queryKey: ['blinkticketinig', 'fetch', { cluster, account }],
    queryFn: () => program.account.blinkticketinig.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['blinkticketinig', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ blinkticketinig: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['blinkticketinig', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ blinkticketinig: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['blinkticketinig', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ blinkticketinig: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['blinkticketinig', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ blinkticketinig: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
