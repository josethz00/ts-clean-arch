export interface IHasherService {
  create(s: string): Promise<string>;
  compare(s: string, h: string): Promise<boolean>;
}
