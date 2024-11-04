// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import BlinkticketinigIDL from '../target/idl/blinkticketinig.json'
import type { Blinkticketinig } from '../target/types/blinkticketinig'

// Re-export the generated IDL and type
export { Blinkticketinig, BlinkticketinigIDL }

// The programId is imported from the program IDL.
export const BLINKTICKETINIG_PROGRAM_ID = new PublicKey(BlinkticketinigIDL.address)

// This is a helper function to get the Blinkticketinig Anchor program.
export function getBlinkticketinigProgram(provider: AnchorProvider) {
  return new Program(BlinkticketinigIDL as Blinkticketinig, provider)
}

// This is a helper function to get the program ID for the Blinkticketinig program depending on the cluster.
export function getBlinkticketinigProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Blinkticketinig program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return BLINKTICKETINIG_PROGRAM_ID
  }
}
