export interface IAuction {
  AuctionId: number;
  Name: string;
  InitialValue: number;
  IsItemUsed: boolean;
  ResponsibleId: number;
  OpenedAt: string;
  ClosedAt: string;
}

export interface IAuctionDTO {
    AuctionId: number;
    Name: string;
    InitialValue: number;
    IsItemUsed: boolean;
    ResponsibleId: number;
    OpenedAt: string;
    ClosedAt: string;
}

export interface ICreateAuctionInput {
    Name: string;
    InitialValue: number;
    IsItemUsed: boolean;
    OpenedAt: string;
    ClosedAt: string;
}

export interface ICreateAuctionOutput {
  Auction: IAuctionDTO;
}

export interface IDeleteAuctionInput {
  AuctionId: number;
}

export interface IDeleteAuctionOutput {
  Auction: IAuctionDTO;
}

export interface IEditAuctionInput {
    AuctionId: number;
    Name: string;
    InitialValue: number;
    IsItemUsed: boolean;
    ResponsibleId: number;
    OpenedAt: string;
    ClosedAt: string;
}

export interface IEditAuctionOutput {
  Auction: IAuctionDTO;
}

export interface IGetAuctionInput {
  AuctionId: number;
}

export interface IGetAuctionOutput {
  Auction: IAuctionDTO;
}

export interface IListAuctionOutput {
  ArrAuction: IAuctionDTO[];
}
