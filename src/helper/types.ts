export interface APIV3Res<dataType> {
  Response: {
    RequestId: string
  } & dataType
}

export interface APIV3Error {
  Response: {
    RequestId: string
    Error: {
      Message: string
    }
  }
}
