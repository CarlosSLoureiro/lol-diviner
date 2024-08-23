import { DataSource } from "typeorm";

import { Champion } from "./champion";

class PGDataSource {
  private static instance: PGDataSource;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "vectorexample",
      entities: [Champion],
      logging: false,
      synchronize: false,
    });
  }

  public static getInstance(): PGDataSource {
    if (!PGDataSource.instance) {
      PGDataSource.instance = new PGDataSource();
      PGDataSource.instance.dataSource.initialize();
    }
    return PGDataSource.instance;
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}

export const DataBase = PGDataSource.getInstance().getDataSource();
