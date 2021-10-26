export class ConfigService {
  private _mongoUrl: string =
    process.env.MONGOURL ||
    'mongodb+srv://toanle:toan123123@cluster0.g5ye5.mongodb.net/TodoListProject?authSource=admin&replicaSet=atlas-dd4arv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
  private _todoTableName = process.env.TODO_TABLE_NAME || 'todos';
  private _accessKeyId: string =
    process.env.ACCESSKEYID || 'AKIAXPPKD4UJTPPDWR2X';
  private _secretAccessKey: string =
    process.env.SECRETACCESSKEY || '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';

  public get mongoUrl(): string {
    return this._mongoUrl;
  }

  public get todoTableName(): string {
    return this._todoTableName;
  }

  public get accessKeyId(): string {
    return this._accessKeyId;
  }
  public get secretAccessKey(): string {
    return this._secretAccessKey;
  }
}
