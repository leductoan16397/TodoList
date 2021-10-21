export class ConfigService {
  private _mongoUrl: string =
    process.env.MONGOURL ||
    'mongodb+srv://toanle:toan123123@cluster0.g5ye5.mongodb.net/TodoListProject?authSource=admin&replicaSet=atlas-dd4arv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

  public get mongoUrl(): string {
    return this._mongoUrl;
  }
}
