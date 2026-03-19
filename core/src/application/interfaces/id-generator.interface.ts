export interface IdGenerator {
  generateIncremental(): Promise<number>;
}
