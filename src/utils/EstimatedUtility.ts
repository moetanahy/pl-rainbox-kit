import { ethers } from 'ethers';

// Add the SupportedCurrencies enum
export enum SupportedCurrencies {
  EGP = 'EGP',
  USD = 'USD'
}

interface ExchangeResult {
  exchangeRate: number;
  liquidityFee: number;
  transactionFee: number;
  estimatedReceiveAmount: number;
}

export class EstimatedUtility {
  // Update exchange rates to include only EGP and USD
  private exchangeRates: { [key in SupportedCurrencies]: number } = {
    [SupportedCurrencies.USD]: 1,
    [SupportedCurrencies.EGP]: 30.90, // Example rate, update as needed
  };

  // Mock fee percentages (replace with real calculations in production)
  private liquidityFeePercentage = 0.003; // 0.3%
  private transactionFeePercentage = 0.001; // 0.1%

  public estimateExchange(
    sendAmount: number,
    sendCurrency: SupportedCurrencies,
    receiveCurrency: SupportedCurrencies
  ): ExchangeResult {
    const sendRate = this.exchangeRates[sendCurrency] || 1;
    const receiveRate = this.exchangeRates[receiveCurrency] || 1;

    const exchangeRate = receiveRate / sendRate;
    const convertedAmount = sendAmount * exchangeRate;

    const liquidityFee = convertedAmount * this.liquidityFeePercentage;
    const transactionFee = convertedAmount * this.transactionFeePercentage;

    const estimatedReceiveAmount = convertedAmount - liquidityFee - transactionFee;

    return {
      exchangeRate,
      liquidityFee,
      transactionFee,
      estimatedReceiveAmount,
    };
  }

  public formatCurrency(amount: number, currency: SupportedCurrencies): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }
}