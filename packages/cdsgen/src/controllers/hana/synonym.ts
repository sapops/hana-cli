export type hdbsynonym = Record<
  string,
  {
    target:
      | { schema?: string; object: string; revalidate?: boolean }
      | { logical_schema: string; object: string }
      | {
          remote: string;
          schema: string;
          object: string;
        };
  }
>;
