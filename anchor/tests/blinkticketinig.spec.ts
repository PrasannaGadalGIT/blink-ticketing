import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Blinkticketinig} from '../target/types/blinkticketinig'

describe('blinkticketinig', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Blinkticketinig as Program<Blinkticketinig>

  const blinkticketinigKeypair = Keypair.generate()

  it('Initialize Blinkticketinig', async () => {
    await program.methods
      .initialize()
      .accounts({
        blinkticketinig: blinkticketinigKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([blinkticketinigKeypair])
      .rpc()

    const currentCount = await program.account.blinkticketinig.fetch(blinkticketinigKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Blinkticketinig', async () => {
    await program.methods.increment().accounts({ blinkticketinig: blinkticketinigKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinkticketinig.fetch(blinkticketinigKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Blinkticketinig Again', async () => {
    await program.methods.increment().accounts({ blinkticketinig: blinkticketinigKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinkticketinig.fetch(blinkticketinigKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Blinkticketinig', async () => {
    await program.methods.decrement().accounts({ blinkticketinig: blinkticketinigKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinkticketinig.fetch(blinkticketinigKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set blinkticketinig value', async () => {
    await program.methods.set(42).accounts({ blinkticketinig: blinkticketinigKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinkticketinig.fetch(blinkticketinigKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the blinkticketinig account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        blinkticketinig: blinkticketinigKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.blinkticketinig.fetchNullable(blinkticketinigKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
