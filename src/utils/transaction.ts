import { Transaction, Sequelize } from 'sequelize';
import sequelize from '@/config/db';

export class TransactionHelper {
  /**
   * Execute a function within a database transaction
   * @param fn Function to execute within the transaction
   * @returns Promise with the result of the function
   */
  static async executeInTransaction<T>(
    fn: (transaction: Transaction) => Promise<T>
  ): Promise<T> {
    const transaction = await sequelize.transaction();
    
    try {
      const result = await fn(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * Execute multiple operations in parallel within a single transaction
   * @param operations Array of functions to execute within the transaction
   * @returns Promise with array of results
   */
  static async executeParallelInTransaction<T>(
    operations: Array<(transaction: Transaction) => Promise<T>>
  ): Promise<T[]> {
    return this.executeInTransaction(async (transaction) => {
      return Promise.all(operations.map(op => op(transaction)));
    });
  }
}
