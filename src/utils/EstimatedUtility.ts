import { ethers } from 'ethers';

interface ExchangeResult {
  exchangeRate: number;
  liquidityFee: number;
  transactionFee: number;
  estimatedReceiveAmount: number;
}

export class EstimatedUtility {
  // Mock exchange rates (replace with real data source in production)
  private exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 151.67,
    // Add more currencies as needed
  };

  // Mock fee percentages (replace with real calculations in production)
  private liquidityFeePercentage = 0.003; // 0.3%
  private transactionFeePercentage = 0.001; // 0.1%

  public estimateExchange(
    sendAmount: number,
    sendCurrency: string,
    receiveCurrency: string
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

  public formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }
}