// 后端统一返回数据模型
export type IResponse<T = any> = {
    result: T
  }


  // 后端分页数据模型
  export type PageData<T = any> = {
    total: 0 | number
    records: Array<T>
  }
