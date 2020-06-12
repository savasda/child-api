export class PagedRO<T> {
  data: Array<T>;
  tottal: number;
  constructor(data: Array<T>, tottal: number) {
    this.data = data;
    this.tottal = tottal
  }
}