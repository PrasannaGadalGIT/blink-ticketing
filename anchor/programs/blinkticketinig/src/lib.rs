#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod blinkticketinig {
    use super::*;

  pub fn close(_ctx: Context<CloseBlinkticketinig>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.blinkticketinig.count = ctx.accounts.blinkticketinig.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.blinkticketinig.count = ctx.accounts.blinkticketinig.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeBlinkticketinig>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.blinkticketinig.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeBlinkticketinig<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Blinkticketinig::INIT_SPACE,
  payer = payer
  )]
  pub blinkticketinig: Account<'info, Blinkticketinig>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseBlinkticketinig<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub blinkticketinig: Account<'info, Blinkticketinig>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub blinkticketinig: Account<'info, Blinkticketinig>,
}

#[account]
#[derive(InitSpace)]
pub struct Blinkticketinig {
  count: u8,
}
