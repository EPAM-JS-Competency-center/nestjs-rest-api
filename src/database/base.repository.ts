import { model } from 'dynamoose';
import AppConfig from '../app.config';
import { SchemaDefinition } from 'dynamoose/dist/Schema';
import { Model } from 'dynamoose/dist/Model';
import Internal from 'dynamoose/dist/Internal';
import { TableOptions, TableUpdateOptions } from 'dynamoose/dist/Table';
import { updateTable } from 'dynamoose/dist/Table/utilities';
import { AnyItem } from 'dynamoose/dist/Item';

const TABLE_KEY = Internal.General.internalProperties;

export abstract class BaseRepository<Entity extends AnyItem> {
  protected schema: SchemaDefinition;
  protected entityName: string;
  protected model: Model<Entity>;

  requestTable() {
    return this.model.table();
  }

  getModel() {
    return this.model;
  }

  protected constructor(entityName: string, schema: SchemaDefinition) {
    this.entityName = entityName;
    this.schema = schema;

    this.model = this.createRepository() as unknown as Model<Entity>;
  }

  private createRepository() {
    const { databaseOptions, serviceName } = new AppConfig().build();

    return model(this.entityName, this.schema, {
      create: databaseOptions.tableAutoCreate,
      prefix: `${serviceName || 'Service'}-`,
      suffix: '-Table',
      update: databaseOptions.tableAutoUpdate,
    });
  }

  public async updateTableIndexes() {
    const table = this.requestTable();

    const defaultConfig = table.getInternalProperties(TABLE_KEY);

    const newOptions: TableOptions = {
      ...defaultConfig.options,
      update: [TableUpdateOptions.indexes],
    };

    table.setInternalProperties(TABLE_KEY, {
      ...defaultConfig,
      options: newOptions,
    });

    try {
      await updateTable(table);
    } catch (e) {
      console.error(
        `An error occurred while table updating: ${e.message || '-'}`,
      );
    } finally {
      table.setInternalProperties(TABLE_KEY, defaultConfig);
    }
  }
}
