export interface PostbuildGeneratorSchema {
  name: string;
  force?: boolean;
  scripts?: boolean;
  all?: boolean;
}
