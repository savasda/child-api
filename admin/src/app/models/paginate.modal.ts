export interface PaginatorInterface {
  pageIndex: number;
  pageSize: number;
  sort: Array<{ key: string; value: 'ascend' | 'descend' | null }>;
  filter: Array<{ key: string; value: any | any[] }>;
}

export class PaginateModel {
  skip: string;
  take: string;

  constructor(data?: PaginatorInterface) {
    if(data) {
      this.skip = ((data.pageIndex - 1) * data.pageSize).toString();
      if(+this.skip < 0) this.skip = '0'
      this.take = data.pageSize.toString();
    } else {
      this.skip = '0';
      this.take = '10';
    }
  }
}