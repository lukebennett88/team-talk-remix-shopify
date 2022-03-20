import type {
  BaseOperations,
  OperationData,
  OperationVariables,
  TypedDocumentNode,
} from "@ts-gql/tag/no-transform";
import { getDocumentNode } from "@ts-gql/tag/no-transform";
import { print } from "graphql";

const envVars = {
  API_URL: process.env.API_URL,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
} as const;

type EnvKey = keyof typeof envVars;
type ValidEnvVars = Record<EnvKey, string>;

/**
 * Function that throws an error if an environment variable is missing
 */
function getValidEnvVars(): ValidEnvVars {
  const missingEnvVars = Object.entries(envVars).filter(([_, value]) => !value);

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingEnvVars
        .map(([key]) => `${key}`)
        .join(", ")}`
    );
  }

  return envVars as ValidEnvVars;
}

const { ACCESS_TOKEN, API_URL } = getValidEnvVars();

type RequiredKeys<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? never : K;
} extends { [_ in keyof T]: infer U }
  ? {} extends U
    ? never
    : U
  : never;

type HasRequiredVariables<
  TTypedDocumentNode extends TypedDocumentNode<BaseOperations>,
  RequiredResult,
  OptionalResult
> = RequiredKeys<OperationVariables<TTypedDocumentNode>> extends never
  ? OptionalResult
  : RequiredResult;

export async function shopifyClient<
  TTypedDocumentNode extends TypedDocumentNode<BaseOperations>
>(
  options: {
    operation: TTypedDocumentNode;
    request?: Request;
  } & HasRequiredVariables<
    TTypedDocumentNode,
    { variables: OperationVariables<TTypedDocumentNode> },
    { variables?: OperationVariables<TTypedDocumentNode> }
  >
): Promise<{ data: OperationData<TTypedDocumentNode>; response: Response }> {
  const cookieHeader = options.request?.headers.get("Cookie");
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      query: print(getDocumentNode(options.operation)),
      variables: options.variables,
    }),
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
  const json = await response.json();
  if (json.errors) {
    throw new Error(`${json.errors.map((x: any) => x.message).join("\n")}`);
  }
  return { data: json.data, response };
}
